import { WsCommand, WsSubCommand } from "./wscommand";

/**
 * MAH websocket基本包格式
 */

export type SyncId = string

export interface WsRequestBody<T extends WsCommand, C> {
    command: T,
    subCommand?: WsSubCommand<T>,
    content?: C
}

export interface WsSyncRequestBody<T extends WsCommand, C> extends WsRequestBody<T, C> {
    syncId: SyncId,
    command: T,
    subCommand?: WsSubCommand<T>,
    content?: C
}

export interface WsResponseBody<D> {
    data: D
}

export interface WsSyncResponseBody<D> extends WsResponseBody<D> {
    syncId: SyncId,
    data: D
}