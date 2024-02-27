import { ReactNode, createContext, useContext, useMemo } from "react"
import { useJobsQuery } from "../hooks/use-jobs-query"
import { JobData } from "../job-data"

const ActiveJobContext = createContext<JobData | null>(null)

export function useActiveJob(): JobData | null {
    return useContext(ActiveJobContext)
}

export interface ActiveJobProviderProps {
    children: ReactNode
    shouldDefault: boolean
}

export function ActiveJobProvider({
    children,
    shouldDefault,
}: ActiveJobProviderProps) {
    const { jobs, hashedJob } = useJobsQuery()

    const value = useMemo(() => {
        const firstJob = jobs[0] ?? null
        const defaultValue = shouldDefault ? firstJob : null
        return hashedJob ?? defaultValue
    }, [jobs, hashedJob])

    return (
        <ActiveJobContext.Provider value={value}>
            {children}
        </ActiveJobContext.Provider>
    )
}
