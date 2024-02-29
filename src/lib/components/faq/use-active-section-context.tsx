import { ReactNode, createContext, useContext, useMemo, useState } from "react"

type Id = string

export interface ActiveSectionValue {
    activeSectionId: Id | null
    markSection: (id: string, active: boolean) => void
    deleteSection: (id: string) => void
    setOverride: (id: string) => void
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
    orderedIds: Id[]
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

    const [activeSectionOverride, setActiveSectionOverride] =
        useState<Id | null>(null)

    const value = {
        activeSectionId: activeSectionOverride ?? activeSectionId,
        markSection: (id: Id, active: boolean) => {
            setSections((sections) => ({
                ...sections,
                [id]: active,
            }))
            setActiveSectionOverride(null)
        },
        deleteSection: (id: Id) => {
            const update = {
                ...sections,
            }
            delete update[id]
            return update
        },
        setOverride: (id: Id) => {
            // Wait for the scroll to finish and then set the override
            // The override will be reset on next scroll
            setTimeout(() => {
                setActiveSectionOverride(id)
            }, 50)
        },
    }

    return (
        <ActiveSectionContext.Provider value={value}>
            {children}
        </ActiveSectionContext.Provider>
    )
}
