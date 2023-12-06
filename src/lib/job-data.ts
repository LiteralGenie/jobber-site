type IsoDate = string

export interface JobData {
    id: string

    clearance: boolean
    company: string
    description: string
    time_updated: IsoDate
    title: string

    // optionals
    location: null | 'remote' | 'hybrid' | 'on-site'
    salary: SalaryRange | null

    responsibilities: string[]
    skills: Record<string, number>
}

interface SalaryRange {
    min: number
    max: number | null
}

interface SkillRange {
    min: number,
    max: number | null
}