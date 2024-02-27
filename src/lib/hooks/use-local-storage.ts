import { useEffect, useState } from "react"

/**
 * Reads initial value from localStorage
 * Writes new value to localStorage when setValue() is called
 *
 * (This does not update the current value if localStorage is updated manually)
 */
export function useLocalStorage(key: string) {
    const [value, setValue] = useState<string | null>(null)

    function recheckValue() {
        const update = localStorage.getItem(key) as string | null
        setValue(update)
    }

    useEffect(() => {
        recheckValue()
    }, [])

    return {
        value,
        setValue: (update: string) => {
            window.localStorage.setItem(key, update)
            setValue(update)
        },
    }
}
