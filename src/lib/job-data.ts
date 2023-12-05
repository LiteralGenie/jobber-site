type IsoDate = string

export interface JobData {
    id: string
    title: string
    company: string
    time_updated: IsoDate
    description: string

    // optionals
    benefits: Record<string, number | null>
    responsibilities: Record<string, string>
    salary: SalaryRange | null
    skills: Record<string, SkillRange | null>
}

interface SalaryRange {
    min: number
    max: number
}

interface SkillRange {
    min: number,
    max: number | null
}