export interface SearchFormData {
    skills: {
        include: Array<{
            id: number | ""
            yoe: number
        }>
        exclude: { id: number | "" }[]
    }
    duties: {
        include: { id: number | "" }[]
        exclude: { id: number | "" }[]
    }
    text: string
    salary: number
    clearance: "any" | "no" | "yes"
}

export interface SearchParamsData {
    text?: string
    clearance?: boolean
    salary?: number
    "skills-included"?: Array<{ name: string; yoe: number }>
    "skills-excluded"?: string[]
    "duties-included"?: string[]
    "duties-excluded"?: string[]
}
