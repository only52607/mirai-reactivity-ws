import { effect, Ref, ref, unref } from "@vue/reactivity"
import { BotProfile, FriendProfile, MemberInfo, Optional, ReactivityState } from "../../types"
import { useMiraiApi } from "./mirai-api"

const miraiApi = useMiraiApi()

const botProfileRef: Ref<Optional<BotProfile>> = ref()   // 全局好友列表响应体
const botProfileState: Ref<ReactivityState> = ref("pending")
let usedBotProfile = false

export function useBotProfile() {
    async function scheduler() {
        if (!miraiApi.value) return
        botProfileState.value = "loading"
        botProfileRef.value = await miraiApi.value.botProfile()
        botProfileState.value = "done"
    }
    if (!usedBotProfile) {
        effect(() => miraiApi.value != undefined, { scheduler })
        scheduler()
        usedBotProfile = true
    }
    return {
        botProfile: botProfileRef,
        state: botProfileState,
        emitUpdate: scheduler
    }
}

export function useFriendProfile(target: number | Ref<Optional<number>>) {
    const profileRef: Ref<Optional<FriendProfile>> = ref()
    const state: Ref<ReactivityState> = ref("pending")
    async function scheduler() {
        if (!miraiApi.value) return
        const unrefTarget = unref(target)
        if (!unrefTarget) return
        state.value = "loading"
        profileRef.value = await miraiApi.value.friendProfile(unrefTarget)
        state.value = "done"
    }
    effect(() => [miraiApi.value != undefined, unref(target)], { scheduler })
    scheduler()
    return {
        profile: profileRef,
        state,
        emitUpdate: scheduler
    }
}

export function useMemberProfile(target: number | Ref<Optional<number>>, memberId: number | Ref<Optional<number>>) {
    const profileRef: Ref<Optional<MemberInfo>> = ref()
    const state: Ref<ReactivityState> = ref("pending")
    async function scheduler() {
        if (!miraiApi.value) return
        const unrefTarget = unref(target)
        const unrefMemberId = unref(memberId)
        if (!unrefTarget || !unrefMemberId) return
        state.value = "loading"
        profileRef.value = await miraiApi.value.memberInfo(unrefTarget, unrefMemberId)
        state.value = "done"
    }
    effect(() => [miraiApi.value != undefined, unref(target), unref(memberId)], { scheduler })
    scheduler()
    return {
        profile: profileRef,
        state,
        emitUpdate: scheduler
    }
}