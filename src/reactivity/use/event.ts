import { effect, reactive, UnwrapRef } from "@vue/reactivity";
import { Event } from "../../types";
import { useMiraiApi } from "./mirai-api";

export type EventFilter = (event: Event) => boolean

export function friendMessageFilter(friendId: number) {
    return (event: Event) => event.type == "FriendMessage" && event.sender.id == friendId
}

export function groupMessageFilter(groupId: number) {
    return (event: Event) => event.type == "GroupMessage" && event.sender.group.id == groupId
}

const eventStore = new Map<EventFilter, UnwrapRef<Event[]>>()

const miraiApi = useMiraiApi()

const eventDispatcher = (event: Event) => {
    eventStore.forEach((store, filter) => {
        if (filter(event)) {
            store.push(event)
        }
    })
}

let isInit = false

effect(() => {
    if (isInit || !miraiApi.value) return
    miraiApi.value.addMiraiEventListener(eventDispatcher)
})

export function useEventStore(eventFilter: EventFilter) {
    const store:UnwrapRef<Event[]> = reactive([] as Event[])
    eventStore.set(eventFilter, store)
    return store
}