type IsoDate = string

export interface JobData {
    id: string

    clearance: boolean
    company: string
    description: string
    time_created: IsoDate
    title: string

    // optionals
    location: null | 'remote' | 'hybrid' | 'on-site'
    salary: SalaryRange | null

    duties: string[]
    skills: string[]
}

interface SalaryRange {
    min: number
    max: number | null
}
