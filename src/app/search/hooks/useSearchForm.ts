import { PageProps } from "@/app/types"
import { nullifyEmptyArrays } from "@/lib/misc-utils"
import { ParserBuilder } from "nuqs"
import { SearchFilters, SearchFormData } from "../types"
import { SEARCH_FILTERS_PARSER } from "./constants"
import { useSearchFilters } from "./useSearchFilters"

export function useSearchForm() {
    const { searchFilters, setSearchFilters } = useSearchFilters()

    return {
        loadFromUrl: () => filtersToFormData(searchFilters),
        submit: (data: SearchFormData) => {
            const update = formDataToFilters(data)
            setSearchFilters(update)
        },
    }
}

export function filtersToFormData(filters: SearchFilters): SearchFormData {
    const d = filters

    const locationTypes = {
        hybrid: false,
        onsite: false,
        remote: false,
    }
    d["location-types"].forEach((loc) => (locationTypes[loc] = true))

    return {
        after: d.after,
        text: d.text,
        salary: d.salary,
        clearance: d.clearance === null ? "" : d.clearance,
        locationTypes,
        skills: {
            include: d["skills-included"].map((id) => ({ id })),
            exclude: d["skills-excluded"].map((id) => ({ id })),
        },
        duties: {
            include: d["duties-included"].map((id) => ({ id })),
            exclude: d["duties-excluded"].map((id) => ({ id })),
        },
        locations: {
            cities: d.cities,
            states: d.states,
        },
        yoe: {
            minimum: d["yoe-minimum"],
            ignoreNull: d["yoe-ignore-null"],
        },
    }
}

export function pageParamsToFilters(
    searchParams: PageProps["searchParams"]
): SearchFilters {
    const filters = Object.fromEntries(
        Object.entries(SEARCH_FILTERS_PARSER).map(([k, v]) => {
            const param = searchParams[k]
            const val = (v as ParserBuilder<any>).parseServerSide(param)
            return [k, val]
        })
    ) as SearchFilters

    return filters
}

export function formDataToFilters(
    data: SearchFormData
): Partial<SearchFilters> {
    const update = {} as Partial<SearchFilters>

    update.after = data.after

    if (data.text) {
        update.text = data.text
    }

    update.clearance = data.clearance === "" ? null : data.clearance

    if (data.salary > 0) {
        update.salary = data.salary
    }

    update["location-types"] = []
    if (data.locationTypes.hybrid) update["location-types"].push("hybrid")
    if (data.locationTypes.onsite) update["location-types"].push("onsite")
    if (data.locationTypes.remote) update["location-types"].push("remote")

    if (data.yoe.minimum) {
        update["yoe-minimum"] = data.yoe.minimum
    }

    if (data.yoe.ignoreNull) {
        update["yoe-ignore-null"] = true
    }

    update["skills-included"] = data.skills.include.map(({ id }) => id)
    update["skills-excluded"] = data.skills.exclude.map(({ id }) => id)

    update["duties-included"] = data.duties.include.map(({ id }) => id)
    update["duties-excluded"] = data.duties.exclude.map(({ id }) => id)

    update.cities = data.locations.cities
    update.states = data.locations.states

    // Do not show empty arrays in url
    nullifyEmptyArrays(update)

    return update
}
