import { useQueryParams } from "../useQueryParams"
import { SearchFormData } from "./types"

export function useSearchForm() {
    const queryParams = useQueryParams()

    return {
        getDefaultFromUrl: () => getDefaultFromUrl(queryParams),
        serializeForm,
    }
}

function getDefaultFromUrl(queryParams: ReturnType<typeof useQueryParams>) {
    const fromDefault = {
        skills: {
            include: [],
            exclude: [],
        },
        duties: {
            include: [],
            exclude: [],
        },
        locations: {
            hybrid: false,
            onsite: false,
            remote: false,
        },
        text: "",
        salary: 0,
        clearance: "any",
    } as Omit<SearchFormData, "after">

    const fromUrl = deserializeParams(queryParams.get())

    const result = { ...fromDefault, after: "" } satisfies SearchFormData

    result.text = fromUrl.text || fromDefault.text
    result.salary = fromUrl.salary || fromDefault.salary
    result.clearance = fromUrl.clearance || fromDefault.clearance
    result.locations = fromUrl.locations || fromDefault.locations
    result.skills.include = fromUrl.skills?.include.length
        ? fromUrl.skills.include
        : fromDefault.skills.include
    result.skills.exclude = fromUrl.skills?.exclude.length
        ? fromUrl.skills.exclude
        : fromDefault.skills.exclude
    result.duties.include = fromUrl.duties?.include.length
        ? fromUrl.duties.include
        : fromDefault.duties.include
    result.duties.exclude = fromUrl.duties?.exclude.length
        ? fromUrl.duties.exclude
        : fromDefault.duties.exclude

    return result
}

/**
 * Convert form data to query params
 */
function serializeForm(data: SearchFormData): URLSearchParams {
    const params = new URLSearchParams()

    params.set("after", data.after.toString())

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

    data.skills.include.forEach(({ id }) =>
        params.append("skills-included", id.toString())
    )

    data.skills.exclude.forEach(({ id }) =>
        params.append("skills-included", id.toString())
    )

    data.duties.include.forEach(({ id }) =>
        params.append("duties-included", id.toString())
    )

    data.duties.exclude.forEach(({ id }) =>
        params.append("duties-excluded", id.toString())
    )

    return params
}

export function deserializeParams(
    params: URLSearchParams
): Partial<SearchFormData<never>> {
    const data: Partial<SearchFormData<never>> = {}

    const afterRaw = params.get("after")
    const after = afterRaw ? parseInt(afterRaw) : NaN
    if (!isNaN(after)) {
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
