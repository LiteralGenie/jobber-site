import { useLocalStorage } from "@/lib/hooks/use-local-storage"
import { JobData } from "@/lib/job-data"
import { useMemo } from "react"

type Id = JobData["id"]

export function useSeen() {
    const { value: rawValue, setValue: setRawValue } = useLocalStorage("seen")

    const value = useMemo(() => loadValue(rawValue), [rawValue])

    return {
        value,
        add: (id: Id) => {
            const update = new Set(value)
            update.add(id)
            setRawValue(dumpValue(update))
        },
        delete: (id: Id) => {
            const update = new Set(value)
            update.delete(id)
            setRawValue(dumpValue(update))
        },
    }
}

function loadValue(value: string | null): Set<Id> {
    // Default if no localStorage value
    if (value === null) {
        return new Set()
    }

    // Default if unparsable
    let parsed: any
    try {
        parsed = JSON.parse(value as any)
    } catch {
        return new Set()
    }

    // Default if parsed value isn't string[]
    if (!Array.isArray(parsed) || parsed.some((x) => typeof x !== "number")) {
        console.warn("Invalid localStorage value for seen", parsed)
        return new Set()
    }

    return new Set(parsed)
}

function dumpValue(value: Set<Id>): string {
    return JSON.stringify(Array.from(value))
}
