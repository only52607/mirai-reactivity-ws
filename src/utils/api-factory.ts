import { MiraiApiWebSocketClient, MiraiApiWebSocketImpl, MiraiWsConnectParams } from "../api";

/**
 * 构建mah websocket客户端
 * @param params 
 * @returns 
 */
export async function createMiraiWebsocketApi(params: MiraiWsConnectParams) {
    const instance = new MiraiApiWebSocketClient()
    const authentication = await instance.connect(params)
    const api = new MiraiApiWebSocketImpl(instance)
    return { api, authentication }
}