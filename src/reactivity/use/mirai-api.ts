import { ref, Ref } from "@vue/reactivity"
import { MiraiApi } from "../../api"

const defaultMiraiApi: Ref<MiraiApi|undefined> = ref(undefined) // 全局默认api实现

const miraiApiAvailable = ref(false)

export function useMiraiApi() {
    return defaultMiraiApi
}

export function useMiraiApiAvailable() {
    return miraiApiAvailable
}

export function registerGlobalMiraiApi(miraiApi: MiraiApi) {
    miraiApiAvailable.value = false
    defaultMiraiApi.value = undefined
    defaultMiraiApi.value = miraiApi
    miraiApiAvailable.value = true
    defaultMiraiApi.value.addCloseListener(() => {
        miraiApiAvailable.value = false
    })
}
