import { effect, Ref, ref } from "@vue/reactivity"
import { BotProfile, FriendProfile, MemberInfo, Optional, ReactivityState } from "../../types"
import { useMiraiApi } from "./mirai-api"

export const botProfileRef: Ref<Optional<BotProfile>> = ref()   // 全局好友列表响应体
export const botProfileState: Ref<ReactivityState> = ref("pending")
export const usedBotProfile = ref(false)
const miraiApi = useMiraiApi()

export async function updateBotProfile() {
    if (!usedBotProfile.value || !miraiApi.value) return
    botProfileState.value = "loading"
    botProfileRef.value = await miraiApi.value.botProfile()
    botProfileState.value = "done"
}

effect(() => [usedBotProfile.value, miraiApi.value != undefined], {
    scheduler: updateBotProfile
})

export function useBotProfile() {
    usedBotProfile.value = true
    return {
        botProfile: botProfileRef,
        state: botProfileState,
        emitUpdate: updateBotProfile
    }
}

export function useFriendProfile(target: number) {
    const profileRef: Ref<Optional<FriendProfile>> = ref()
    const state:Ref<ReactivityState> = ref("pending")
    async function scheduler() {
        if (!miraiApi.value) return
        state.value = "loading"
        profileRef.value = await miraiApi.value.friendProfile(target)
        state.value = "done"
    }
    effect(() => [miraiApi.value != undefined], { scheduler })
    return {
        profile: profileRef,
        state,
        emitUpdate: scheduler
    }
}

export function useMemberProfile(target: number, memberId: number) {
    const profileRef: Ref<Optional<MemberInfo>> = ref()
    const state:Ref<ReactivityState> = ref("pending")
    async function scheduler() {
        if (!miraiApi.value) return
        state.value = "loading"
        profileRef.value = await miraiApi.value.memberInfo(target, memberId)
        state.value = "done"
    }
    effect(() => [miraiApi.value != undefined], { scheduler })
    return {
        profile: profileRef,
        state,
        emitUpdate: scheduler
    }
}