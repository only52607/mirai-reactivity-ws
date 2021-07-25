import { WsCommand, WsSubCommand } from "./wscommand";

export declare type SyncId = string

export declare interface WsRequestBody<T extends WsCommand, C> {
    command: T,
    subCommand?: WsSubCommand<T>,
    content?: C
}

export declare interface WsSyncRequestBody<T extends WsCommand, C> extends WsRequestBody<T, C> {
    syncId: SyncId,
    command: T,
    subCommand?: WsSubCommand<T>,
    content?: C
}

export declare interface WsResponseBody<D> {
    data: D
}

export declare interface WsSyncResponseBody<D> extends WsResponseBody<D> {
    syncId: SyncId,
    data: D
}