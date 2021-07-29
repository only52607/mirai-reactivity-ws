import { effect, Ref, ref, unref } from "@vue/reactivity"
import { Friend, Group, Member, Optional, ReactivityState } from "../../types"
import { useMiraiApi } from "./mirai-api"

const miraiApi = useMiraiApi()

const friendsRef: Ref<Optional<Friend[]>> = ref()   // 全局好友列表响应体
const friendsState: Ref<ReactivityState> = ref("pending")
let usedFriends = false

export function useFriends() {
    async function scheduler() {
        if (!miraiApi.value) return
        friendsState.value = "loading"
        friendsRef.value = await miraiApi.value.friendList()
        friendsState.value = "done"
    }
    if (!usedFriends) {
        effect(() => miraiApi.value != undefined, { scheduler })
        scheduler()
        usedFriends = true
    }
    return {
        friends: friendsRef,
        state: friendsState,
        emitUpdate: scheduler
    }
}

export const groupsRef: Ref<Optional<Group[]>> = ref()   // 全局群列表响应体
export const groupsState: Ref<ReactivityState> = ref("pending")
let usedGroups = false

export function useGroups() {
    async function scheduler() {
        if (!miraiApi.value) return
        groupsState.value = "loading"
        groupsRef.value = await miraiApi.value.groupList()
        groupsState.value = "done"
    }
    if (!usedGroups) {
        effect(() => miraiApi.value != undefined, { scheduler })
        scheduler()
        usedGroups = true
    }
    return {
        groups: groupsRef,
        state: groupsState,
        emitUpdate: scheduler
    }
}


export function useMemberList(target: number | Ref<Optional<number>>) {
    const listRef: Ref<Optional<Member[]>> = ref()
    const state: Ref<ReactivityState> = ref("pending")
    async function scheduler() {
        if (!miraiApi.value) return
        const unrefTarget = unref(target)
        if (!unrefTarget) return
        state.value = "loading"
        listRef.value = await miraiApi.value.memberList(unrefTarget)
        state.value = "done"
    }
    effect(() => [miraiApi.value != undefined, unref(target)], { scheduler })
    scheduler()
    return {
        members: listRef,
        state,
        emitUpdate: scheduler
    }
}