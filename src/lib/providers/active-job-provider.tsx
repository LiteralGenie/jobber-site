import { ReactNode, createContext, useContext, useMemo } from "react"
import { useJobsQuery } from "../hooks/useJobsQuery"
import { JobData } from "../job-data"

const ActiveJob = createContext<JobData | null>(null)

export function useActiveJob(): JobData | null {
    return useContext(ActiveJob)
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
    }, [hashedJob])

    return <ActiveJob.Provider value={value}>{children}</ActiveJob.Provider>
}
