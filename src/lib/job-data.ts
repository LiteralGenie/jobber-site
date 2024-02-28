type IsoDate = string

export interface JobData {
    id: string
    rowid: number

    clearance: boolean
    company: string
    description: string
    location_type: LocationType
    salary: number
    time_created: IsoDate
    title: string
    yoe: number | null

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
