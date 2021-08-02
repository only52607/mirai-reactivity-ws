export * from "./message-event"
export * from "./normal-event"
import { MessageEvent } from "./message-event"
import { NormalEvent } from "./normal-event"

export declare type MiraiEvent = MessageEvent | NormalEvent
export declare type Event = MiraiEvent
export declare type MiraiEventListener = (event: MiraiEvent) => void
export declare type EventListener = MiraiEventListener