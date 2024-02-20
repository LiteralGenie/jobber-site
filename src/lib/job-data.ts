type IsoDate = string

export interface JobData {
    id: string

    clearance: boolean
    company: string
    description: string
    time_created: IsoDate
    title: string

    // optionals
    location_type: LocationType
    salary: SalaryRange | null

    skills: Array<{
        id: number
        name: string
    }>

    duties: Array<{
        id: number
        name: string
    }>

    locations: Array<{
        id: number
        country: string | null
        state: string | null
        city: string | null
    }>
}

interface LocationType {
    is_hybrid: boolean
    is_onsite: boolean
    is_remote: boolean
}

interface SalaryRange {
    min: number
    max: number | null
}
