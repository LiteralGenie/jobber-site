export interface SearchFormData<NullType = ""> {
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
    locations: {
        cities: number[]
        states: string[]
    }
    text: string
    salary: number
    clearance: "any" | "no" | "yes"
    yoe: {
        minimum: number
        ignoreNull: boolean | NullType
    }
    after: number | NullType
}

export interface SearchParamsData {
    text?: string
    clearance?: boolean
    salary?: number
    "skills-included"?: string[]
    "skills-excluded"?: string[]
    "duties-included"?: string[]
    "duties-excluded"?: string[]
    "yoe-minimum"?: number
    "yoe-ignore-null"?: boolean
}
