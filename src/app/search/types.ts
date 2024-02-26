export type LocationType = "hybrid" | "onsite" | "remote"

export interface SearchFormData {
    after: number | null
    text: string
    salary: number
    clearance: boolean | ""
    locations: {
        cities: number[]
        states: string[]
    }
    skills: {
        include: { id: number }[]
        exclude: { id: number }[]
    }
    duties: {
        include: { id: number }[]
        exclude: { id: number }[]
    }
    locationTypes: {
        hybrid: boolean
        onsite: boolean
        remote: boolean
    }
    yoe: {
        minimum: number
        ignoreNull: boolean
    }
}

export interface SearchFilters {
    after: number | null
    text: string
    salary: number
    clearance: boolean | null
    "location-types": LocationType[]
    "skills-included": number[]
    "skills-excluded": number[]
    "duties-included": number[]
    "duties-excluded": number[]
    cities: number[]
    states: string[]
    "yoe-minimum": number
    "yoe-ignore-null": boolean
}
