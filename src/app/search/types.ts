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
    text: string
    salary: number
    clearance: "any" | "no" | "yes"
    after: number | NullType
    locations: number[]
}

export interface SearchParamsData {
    text?: string
    clearance?: boolean
    salary?: number
    "skills-included"?: string[]
    "skills-excluded"?: string[]
    "duties-included"?: string[]
    "duties-excluded"?: string[]
}
