import WebSocket from "isomorphic-ws";
import { EventListener } from "src/types/event";
import { WsCommand } from "src/types/ws/wscommand";
import { SyncId, WsRequestBody, WsResponseBody, WsSyncRequestBody, WsSyncResponseBody } from "../types/ws/wspacket"

type VerifyKeyAuthentication = { qq: number, verifyKey: string }
type SessionKeyAuthentication = { sessionKey: string }
type WsAuthentication = VerifyKeyAuthentication | SessionKeyAuthentication
type AuthenticationResult = { code: number } & SessionKeyAuthentication

interface MiraiWsConnectParams {
  address: string,
  authentication: WsAuthentication
}

interface MiraiApiWebSocketOptions {
  maxWaitTime?: number
  reservedSyncId?: SyncId
}

export class MiraiApiWebSocket {
  public websocket?: WebSocket
  private promiseResolvers = new Map<SyncId, ((value: any) => void)>()
  private authenticateResolver?: ((value: AuthenticationResult) => void)
  private eventListeners = new Set<EventListener>()

  constructor(public options?: MiraiApiWebSocketOptions) {
  }

  private sendRequestRaw<T extends WsCommand, C>(requestBody: WsSyncRequestBody<T, C>) {
    if (!this.websocket) throw new Error("The websocket instance has not been initialized.")
    this.websocket.send(JSON.stringify(requestBody))
  }

  public addEventListener(listener: EventListener){
    this.eventListeners.add(listener)
  }

  public onClose(listener: (this: WebSocket, code: number, reason: string) => void) {
    if (!this.websocket) throw new Error("The websocket instance has not been initialized.")
    this.websocket.on("close", listener)
  }

  public onError(listener: (this: WebSocket, err: Error) => void) {
    if (!this.websocket) throw new Error("The websocket instance has not been initialized.")
    this.websocket.on("error", listener)
  }

  public sendRequestForResult<T extends WsCommand, C, R>(requestBody: WsRequestBody<T, C>): Promise<R> {
    const syncId = Date.now().toString()
    let reject: (reason?: any) => void
    const promise = new Promise<R>((_resolve, _reject) => {
      this.promiseResolvers.set(syncId, _resolve)
      reject = _reject
    })
    this.sendRequestRaw({syncId, ...requestBody})
    setTimeout(()=>{
      if (this.promiseResolvers.has(syncId)){
        reject(new Error(`Response timeout waiting for the packet ${syncId}.`))
        this.promiseResolvers.delete(syncId)
      }
    }, this.options?.maxWaitTime ?? 5000)
    return promise
  }

  public connect(params: MiraiWsConnectParams): Promise<AuthenticationResult> {
    this.websocket = new WebSocket(params.address, { headers: params.authentication })
    this.initWebSocket(this.websocket)
    return new Promise<AuthenticationResult>((resolve) => this.authenticateResolver = resolve)
  }

  public disconnect() {
    if (!this.websocket) throw new Error("The websocket instance has not been initialized.")
    this.websocket.close()
  }

  private initWebSocket(websocket: WebSocket) {
    websocket.onopen = (event: WebSocket.OpenEvent) => {}
    websocket.onmessage = (event: WebSocket.MessageEvent) => {
      const body = JSON.parse(event.data.toString()) as WsSyncResponseBody<any>
      switch (body.syncId) {
        case "":
          if (this.authenticateResolver) this.authenticateResolver(body.data)
          this.promiseResolvers.clear()
          this.eventListeners.clear()
          this.authenticateResolver = undefined
          break
        case this.options?.reservedSyncId ?? "-1":
          this.eventListeners.forEach((listener)=>{
            listener(body.data)
          })
          break
        default:
          const resolver = this.promiseResolvers.get(body.syncId)
          if (resolver) {
            resolver(body.data)
          }
          this.promiseResolvers.delete(body.syncId)
      }
    }
  }
}