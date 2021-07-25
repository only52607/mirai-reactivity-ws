export * from "./message-event"
export * from "./normal-event"
import { MessageEvent } from "./message-event"
import { NormalEvent } from "./normal-event"

export declare type Event = MessageEvent | NormalEvent
export declare type EventListener = (event: Event) => void