import { ref, Ref, effect } from "@vue/reactivity"
import { Optional, PluginInfo } from "../../types"
import { useMiraiApi } from "./mirai-api"

const pluginInfoRef: Ref<Optional<PluginInfo>> = ref()   // 全局好友列表响应体

const miraiApi = useMiraiApi()

let usedPluginInfoRef = false

export function usePluginInfo() {
    async function scheduler() {
        if (!miraiApi.value) {
            pluginInfoRef.value = undefined
            return
        }
        pluginInfoRef.value = await miraiApi.value.about()
    }
    if (!usedPluginInfoRef) {
        effect(() => miraiApi.value != undefined, { scheduler })
        scheduler()
        usedPluginInfoRef = true
    }
    return {
        pluginInfo: pluginInfoRef,
        emitUpdate: scheduler
    }
}