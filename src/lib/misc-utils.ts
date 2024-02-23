export type Nullified<T> = { [K in keyof T]: T[K] | null }

export function nullifyEmptyArrays<T>(obj: T): Nullified<T> {
    const target = obj as Nullified<T>

    // Do not show empty arrays in url
    Object.entries(target).forEach(([k, v]) => {
        if (Array.isArray(v) && v.length === 0) {
            target[k as keyof T] = null
        }
    })

    return target
}
