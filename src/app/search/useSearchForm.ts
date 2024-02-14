import { SearchFormData } from "./types"

export function useSearchForm() {
    return { getInitialValue, serializeForm }
}

/**
 * Load form data from url params
 */
function getInitialValue(
    defaultValue: SearchFormData,
    params: URLSearchParams
): SearchFormData {
    const result = { ...defaultValue }
    const paramData = deserializeParams(params)

    result.text = paramData.text || defaultValue.text
    result.salary = paramData.salary || defaultValue.salary
    result.clearance = paramData.clearance || defaultValue.clearance
    result.locations = paramData.locations || defaultValue.locations
    result.skills.include = paramData.skills?.include.length
        ? paramData.skills.include
        : defaultValue.skills.include
    result.skills.exclude = paramData.skills?.exclude.length
        ? paramData.skills.exclude
        : defaultValue.skills.exclude
    result.duties.include = paramData.duties?.include.length
        ? paramData.duties.include
        : defaultValue.duties.include
    result.duties.exclude = paramData.duties?.exclude.length
        ? paramData.duties.exclude
        : defaultValue.duties.exclude
    result.after = paramData.after || defaultValue.after

    return result
}

/**
 * Convert form data to query params
 */
function serializeForm(data: SearchFormData): URLSearchParams {
    const params = new URLSearchParams()

    if (data.after) {
        params.set("after", data.after)
    }

    if (data.text) {
        params.set("text", data.text)
    }

    switch (data.clearance) {
        case "any":
            break
        case "no":
        case "yes":
            params.set("clearance", data.clearance)
            break
    }

    if (data.salary > 0) {
        params.set("salary", data.salary.toString())
    }

    if (data.locations.hybrid) params.append("locations", "hybrid")
    if (data.locations.onsite) params.append("locations", "onsite")
    if (data.locations.remote) params.append("locations", "remote")

    data.skills.include
        .filter(({ id }) => id !== "")
        .forEach(({ id }) => params.append("skills-included", id.toString()))

    data.skills.exclude
        .filter(({ id }) => id !== "")
        .forEach(({ id }) => params.append("skills-included", id.toString()))

    data.duties.include
        .filter(({ id }) => id !== "")
        .forEach(({ id }) => params.append("duties-included", id.toString()))

    data.duties.exclude
        .filter(({ id }) => id !== "")
        .forEach(({ id }) => params.append("duties-excluded", id.toString()))

    return params
}

export function deserializeParams(
    params: URLSearchParams
): Partial<SearchFormData<never>> {
    const data: Partial<SearchFormData<never>> = {}

    const after = params.get("after")
    if (after) {
        data["after"] = after
    }

    const text = params.get("text")
    if (text) {
        data["text"] = text
    }

    const salaryRaw = params.get("salary")
    const salary = salaryRaw ? parseInt(salaryRaw) : NaN
    if (!isNaN(salary)) {
        data["salary"] = salary
    }

    const clearance = params.get("clearance") as any
    if (["no", "yes"].includes(clearance)) {
        data["clearance"] = clearance
    }

    const locations = params.getAll("locations")
    data.locations = { hybrid: false, onsite: false, remote: false }
    ;(["hybrid", "onsite", "remote"] as const).forEach((key) => {
        data.locations![key] = locations.includes(key)
    })

    const skillsIncluded = params.getAll("skills-included")
    if (skillsIncluded.length) {
        data.skills = data.skills || {
            include: [],
            exclude: [],
        }

        data.skills.include = skillsIncluded.flatMap((idRaw) => {
            const id = parseInt(idRaw)
            if (isNaN(id)) {
                return []
            }

            return { id }
        })
    }

    const skillsExcluded = params.getAll("skills-excluded")
    if (skillsExcluded.length) {
        data.skills = data.skills || {
            include: [],
            exclude: [],
        }

        data.skills.exclude = skillsExcluded.flatMap((idRaw) => {
            const id = parseInt(idRaw)
            if (isNaN(id)) {
                return []
            }

            return { id }
        })
    }

    const dutiesExcluded = params.getAll("duties-excluded")
    if (dutiesExcluded.length) {
        data.duties = data.duties || {
            include: [],
            exclude: [],
        }

        data.duties.exclude = dutiesExcluded.flatMap((idRaw) => {
            const id = parseInt(idRaw)
            if (isNaN(id)) {
                return []
            }

            return { id }
        })
    }

    const dutiesIncluded = params.getAll("duties-included")
    if (dutiesIncluded.length) {
        data.duties = data.duties || {
            include: [],
            exclude: [],
        }

        data.duties.include = dutiesIncluded.flatMap((idRaw) => {
            const id = parseInt(idRaw)
            if (isNaN(id)) {
                return []
            }

            return { id }
        })
    }

    return data
}
