import { ReactNode, createContext, useContext, useMemo, useState } from "react"

type Id = string

export interface ActiveSectionValue {
    activeSectionId: Id | null
    markSection: (id: string, active: boolean) => void
    deleteSection: (id: string) => void
}

const ActiveSectionContext = createContext<ActiveSectionValue | null>(null)

export function useActiveSection(): ActiveSectionValue {
    const ctx = useContext(ActiveSectionContext)
    if (ctx === null) {
        throw new Error("No provider for ActiveSectionContext")
    }

    return ctx
}

export interface ActiveSectionProviderProps {
    children: ReactNode
    orderedIds: string[]
}

export function ActiveSectionProvider({
    children,
    orderedIds,
}: ActiveSectionProviderProps) {
    const [sections, setSections] = useState<Record<Id, boolean>>({})

    const activeSectionId = useMemo(
        () => orderedIds.find((id) => !!sections[id]) ?? null,
        [orderedIds, sections]
    )

    const value = {
        activeSectionId,
        markSection: (id: string, active: boolean) =>
            setSections((sections) => ({
                ...sections,
                [id]: active,
            })),
        deleteSection: (id: string) => {
            const update = {
                ...sections,
            }
            delete update[id]
            return update
        },
    }

    return (
        <ActiveSectionContext.Provider value={value}>
            {children}
        </ActiveSectionContext.Provider>
    )
}
