import { effect, reactive, Ref, ref } from "@vue/reactivity"
import { Friend, Group, Optional, ReactivityState } from "../../types"
import { useMiraiApi } from "./mirai-api"

const miraiApi = useMiraiApi()

/**
 * 响应式friends
 */
export const friendsRef: Ref<Optional<Friend[]>> = ref()   // 全局好友列表响应体
export const friendsState: Ref<ReactivityState> = ref("pending")
export const usedFriends = ref(false)

export async function schedulerFriends() {
    if (!usedFriends.value || !miraiApi.value) return
    friendsState.value = "loading"
    friendsRef.value = await miraiApi.value.friendList()
    friendsState.value = "done"
}

effect(()=> [usedFriends.value, miraiApi.value != undefined], { scheduler: schedulerFriends })

export function useFriends() {
    usedFriends.value = true
    return {
        friends: friendsRef,
        state: friendsState,
        emitUpdate: schedulerFriends
    }
}



export const groupsRef: Ref<Optional<Group[]>> = ref()   // 全局群列表响应体
export const groupsState: Ref<ReactivityState> = ref("pending")
export const usedGroups = ref(false)

/**
 * 响应式更新groups
 */
export async function schedulerGroups() {
    if (!usedGroups.value || !miraiApi.value) return
    groupsState.value = "loading"
    groupsRef.value = await miraiApi.value.groupList()
    groupsState.value = "done"
}

effect(()=> [usedFriends.value, miraiApi.value != undefined], { scheduler: schedulerGroups })

export function useGroups() {
    usedGroups.value = true
    return {
        groups: groupsRef,
        state: groupsState,
        emitUpdate: schedulerGroups
    }
}