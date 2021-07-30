import { ref, Ref, effect } from "@vue/reactivity"
import { Optional, PluginInfo } from "../../types"
import { MiraiApi } from "../../api"

export const defaultMiraiApi: Ref<MiraiApi|undefined> = ref(undefined) // 全局默认api实现

export function useMiraiApi() {
    return defaultMiraiApi
}

export function setDefaultMiraiApi(miraiApi: MiraiApi) {
    defaultMiraiApi.value = undefined   // 触发更新
    defaultMiraiApi.value = miraiApi
}

const pluginInfoRef: Ref<Optional<PluginInfo>> = ref()   // 全局好友列表响应体
let usedPluginInfoRef = false

export function usePluginInfo() {
    async function scheduler() {
        if (!defaultMiraiApi.value) {
            pluginInfoRef.value = undefined
            return
        }
        pluginInfoRef.value = await defaultMiraiApi.value.about()
    }
    if (!usedPluginInfoRef) {
        effect(() => defaultMiraiApi.value != undefined, { scheduler })
        scheduler()
        usedPluginInfoRef = true
    }
    return {
        pluginInfo: pluginInfoRef,
        emitUpdate: scheduler
    }
}