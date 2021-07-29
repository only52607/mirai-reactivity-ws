import WebSocket from "isomorphic-ws";
import { getMessageFromStatusCode } from "../utils/status";
import { Event, EventListener } from "../types/event";
import { WsCommand } from "../types/ws/wscommand";
import { SyncId, WsRequestBody, WsResponseBody, WsSyncRequestBody, WsSyncResponseBody } from "../types/ws/wspacket"

type VerifyKeyAuthentication = { qq?: number, verifyKey?: string }
type SessionKeyAuthentication = { sessionKey?: string }
type WsAuthentication = VerifyKeyAuthentication & SessionKeyAuthentication
type AuthenticationResult = { code: number } & SessionKeyAuthentication

export interface MiraiWsConnectParams {
  address: string,
  authentication: WsAuthentication
}

export interface MiraiApiWebSockettClientOptions {
  maxWaitTime?: number
  reservedSyncId?: SyncId
}

type PromiseResolve<T> = (value: T | PromiseLike<T>) => void
type PromiseReject = (reason?: any) => void
type PromiseHandler<T> = { resolve: PromiseResolve<T>, reject: PromiseReject }

/**
 * 实现MAH websocket通信的基本类
 */
export class MiraiApiWebSocketClient {
  public websocket?: WebSocket
  private promiseHandlers = new Map<SyncId, PromiseHandler<WsResponseBody<any>>>()
  private authenticateHandler?: PromiseHandler<AuthenticationResult>
  private eventListeners = new Set<EventListener>()

  constructor(public options?: MiraiApiWebSockettClientOptions) { }

  private sendRequestRaw<T extends WsCommand, C>(requestBody: WsSyncRequestBody<T, C>) {
    if (!this.websocket) throw new Error("The websocket instance has not been initialized.")
    if (this.websocket.readyState != WebSocket.OPEN) throw new Error("The websocket connection has not been opened.")
    this.websocket.send(JSON.stringify(requestBody))
  }

  private buildWsAddress(address: string, authentication: WsAuthentication): string {
    if (authentication.verifyKey) {
      return `${address}?verifyKey=${authentication.verifyKey}&qq=${authentication.qq}`
    }
    return `${address}?sessionKey=${authentication.sessionKey}`
  }

  public isAvaliable() {
    return this.websocket && this.websocket.readyState == WebSocket.OPEN
  }

  /**
   * 监听mirai事件
   * @param listener 
   */
  public addMiraiEventListener(listener: EventListener) {
    this.eventListeners.add(listener)
  }

  /**
   * 移除监听器
   * @param listener 
   */
  public removeMiraiEventListener(listener: EventListener) {
    this.eventListeners.delete(listener)
  }

  /**
   * 主动触发事件
   */
  public emitMiraiEvent(event: Event) {
    this.eventListeners.forEach((listener) => {
      listener(event)
    })
  }

  /**
   * 发送mah数据包，并等待结果
   * @param requestBody 
   * @returns 
   */
  public sendRequestForResult<T extends WsCommand, C, R>(requestBody: WsRequestBody<T, C>): Promise<WsResponseBody<R>> {
    const syncId = Date.now().toString()
    // console.log("sending sync id before^", syncId)
    const promise = new Promise<WsResponseBody<R>>((resolve, reject) => {
      this.promiseHandlers.set(syncId, { resolve, reject })
    })
    this.sendRequestRaw({ syncId, ...requestBody })
    // console.log("sending sync id after&", syncId)
    // 超时处理
    setTimeout(() => {
      if (this.promiseHandlers.has(syncId)) {
        this.promiseHandlers.get(syncId)?.reject(new Error(`Response timeout waiting for the packet ${syncId}.`))
        this.promiseHandlers.delete(syncId)
      }
    }, this.options?.maxWaitTime ?? 5000)
    return promise
  }

  public connect(params: MiraiWsConnectParams): Promise<AuthenticationResult> {
    this.websocket = new WebSocket(this.buildWsAddress(params.address, params.authentication))
    this.initWebSocket(this.websocket)
    const promise = new Promise<AuthenticationResult>((resolve, reject) => {
      this.authenticateHandler = { resolve, reject }
    })
    // 超时处理
    setTimeout(() => {
      if (this.authenticateHandler) {
        this.authenticateHandler?.reject(new Error(`Response timeout waiting for connection.`))
        this.authenticateHandler = undefined
      }
    }, this.options?.maxWaitTime ?? 5000)
    return promise
  }

  public disconnect() {
    if (!this.websocket) throw new Error("The websocket instance has not been initialized.")
    this.websocket.close()
  }

  private initWebSocket(websocket: WebSocket) {
    const SYNC_ID_OPEN = ""
    const SYNC_ID_DEFAULT = "-1"
    websocket.onmessage = (event: WebSocket.MessageEvent) => {
      const body = JSON.parse(event.data.toString()) as WsSyncResponseBody<any>
      switch (body.syncId) {
        case SYNC_ID_OPEN:    // 验证返回包
          if (this.authenticateHandler) this.authenticateHandler?.resolve(body.data)
          this.promiseHandlers.clear()
          this.eventListeners.clear()
          this.authenticateHandler = undefined
          break
        case this.options?.reservedSyncId ?? SYNC_ID_DEFAULT:   // 事件包
          // 分发事件
          this.eventListeners.forEach((listener) => {
            listener(body.data)
          })
          break
        default:  // 请求结果包
          if (this.authenticateHandler) {   // 当验证失败时，该版本ws服务端会返回 { code: number, msg: string } 的消息，需要特殊处理。
            const anyBody = body as any
            if (anyBody.code != undefined && anyBody.msg != undefined) {
              this.authenticateHandler.reject(new Error(getMessageFromStatusCode(anyBody.code)))
            }
            break
          }
          // 回调请求结果
          const resolver = this.promiseHandlers.get(body.syncId)?.resolve
          if (resolver) {
            resolver({ data: body.data })
          }
          this.promiseHandlers.delete(body.syncId)
      }
    }
    websocket.addEventListener("close", () => {
      if (this.authenticateHandler) {
        this.authenticateHandler.reject(new Error("Connect failed. (Parameter error)"))
      }
    })
    websocket.addEventListener("error", (event) => {
      if (this.authenticateHandler) {
        this.authenticateHandler.reject(event.error)
      }
    })
  }
}