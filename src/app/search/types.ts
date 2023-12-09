interface SearchFormData {
    skills: {
        include: Array<{
            name: string
            yoe: number
        }>
        exclude: { name: string }[]
    }
    duties: {
        include: { value: string }[]
        exclude: { value: string }[]
    }
    text: string
    salary: number
    clearance: "any" | "no" | "yes"
}

interface SearchParamsData {
    text?: string
    clearance?: boolean,
    salary?: number
    "skills-included"?: Array<{ name: string, yoe: number }>,
    "skills-excluded"?: string[],
    "duties-included"?: string[],
    "duties-excluded"?: string[],
}