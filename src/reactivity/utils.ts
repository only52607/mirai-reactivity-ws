import { effect, stop } from "@vue/reactivity"

export function watch(getter: () => any, fn: () => any) {
    const runner = effect(getter, {
        lazy: false,
        scheduler: fn
    })
    return () => stop(runner)
}

export function computed(getter: () => any) {
    let value: any
    let dirty = true

    const runner = effect(getter, {
        lazy: true,
        scheduler() {
            dirty = true // deps changed
        }
    })

    // return should be a `Ref` in real world, simplified here
    return {
        get value() {
            if (dirty) {
                value = runner() // re-evaluate
                dirty = false
            }
            return value
        }
    }
}