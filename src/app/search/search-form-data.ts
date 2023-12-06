export interface SearchFormData {
    text: string,
    clearance: boolean | null,
    salary: number | null,

    skills: {
        included: Record<string, number>
        excluded: string[]
    },

    responsibilities: {
        included: string[],
        excluded: string[]
    },
}