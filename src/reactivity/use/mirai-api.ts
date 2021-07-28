import { ref, Ref } from "@vue/reactivity"
import { MiraiApi } from "../../api"

export const defaultMiraiApi: Ref<MiraiApi|undefined> = ref(undefined) // 全局默认api实现

export function useMiraiApi() {
    return defaultMiraiApi
}

export function setDefaultMiraiApi(miraiApi: MiraiApi) {
    defaultMiraiApi.value = undefined   // 触发更新
    defaultMiraiApi.value = miraiApi
}