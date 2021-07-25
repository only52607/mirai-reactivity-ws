import { ref } from "@vue/reactivity";
import WebSocket from "isomorphic-ws";
import { EventListener } from "../types/event";
import { WsCommand } from "../types/ws/wscommand";
import { SyncId, WsRequestBody, WsResponseBody, WsSyncRequestBody, WsSyncResponseBody } from "../types/ws/wspacket"

type VerifyKeyAuthentication = { qq: number, verifyKey: string }
type SessionKeyAuthentication = { sessionKey: string }
type WsAuthentication = VerifyKeyAuthentication | SessionKeyAuthentication
type AuthenticationResult = { code: number } & SessionKeyAuthentication

export interface MiraiWsConnectParams {
  address: string,
  authentication: WsAuthentication
}

export interface MiraiApiWebSockettClientOptions {
  maxWaitTime?: number
  reservedSyncId?: SyncId
}

export class MiraiApiWebSocketClient {
  public websocket?: WebSocket
  private promiseResolvers = new Map<SyncId, ((value: WsResponseBody<any>) => void)>()
  private authenticateResolver?: ((value: AuthenticationResult) => void)
  private eventListeners = new Set<EventListener>()
  public isConnect = ref(false)

  constructor(public options?: MiraiApiWebSockettClientOptions) {
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

  public sendRequestForResult<T extends WsCommand, C, R>(requestBody: WsRequestBody<T, C>): Promise<WsResponseBody<R>> {
    const syncId = Date.now().toString()
    let reject: (reason?: any) => void
    const promise = new Promise<WsResponseBody<R>>((_resolve, _reject) => {
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
    const authentication:any = params.authentication
    const adderss = params.address
    if (authentication.verifyKey) {
      this.websocket = new WebSocket(`${adderss}?verifyKey=${authentication.verifyKey}&qq=${authentication.qq}`)
    } else {
      this.websocket = new WebSocket(`${adderss}?sessionKey=${authentication.sessionKey}`)
    }
    this.initWebSocket(this.websocket)
    let reject: (result: any) => void
    const promise = new Promise<AuthenticationResult>((_resolve, _reject) => {
      this.authenticateResolver = _resolve
      reject = _reject
    })
    setTimeout(()=>{
      if (this.authenticateResolver){
        reject(new Error(`Response timeout waiting for connection.`))
        this.authenticateResolver = undefined
      }
    }, this.options?.maxWaitTime ?? 5000)
    return promise
  }

  public disconnect() {
    if (!this.websocket) throw new Error("The websocket instance has not been initialized.")
    this.websocket.close()
    this.isConnect.value = false
  }

  private initWebSocket(websocket: WebSocket) {
    const SYNC_ID_OPEN = ""
    const SYNC_ID_DEFAULT = "-1"
    websocket.onopen = (event: WebSocket.OpenEvent) => {}
    websocket.onmessage = (event: WebSocket.MessageEvent) => {
      const body = JSON.parse(event.data.toString()) as WsSyncResponseBody<any>
      switch (body.syncId) {
        case SYNC_ID_OPEN:
          if (this.authenticateResolver) this.authenticateResolver(body.data)
          this.promiseResolvers.clear()
          this.eventListeners.clear()
          this.authenticateResolver = undefined
          this.isConnect.value = true
          break
        case this.options?.reservedSyncId ?? SYNC_ID_DEFAULT:
          this.eventListeners.forEach((listener)=>{
            listener(body.data)
          })
          break
        default:
          const resolver = this.promiseResolvers.get(body.syncId)
          if (resolver) {
            resolver({data: body.data})
          }
          this.promiseResolvers.delete(body.syncId)
      }
    }
  }
}