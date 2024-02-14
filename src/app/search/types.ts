export interface SearchFormData<NullType = ""> {
    skills: {
        include: { id: number | NullType }[]
        exclude: { id: number | NullType }[]
    }
    duties: {
        include: { id: number | NullType }[]
        exclude: { id: number | NullType }[]
    }
    locations: {
        hybrid: boolean
        onsite: boolean
        remote: boolean
    }
    text: string
    salary: number
    clearance: "any" | "no" | "yes"
    after: string
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
