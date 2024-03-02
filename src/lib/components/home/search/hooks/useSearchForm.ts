import { PageProps } from "@/app/types"
import { Nullified } from "@/lib/misc-utils"
import { ParserBuilder } from "nuqs"
import { isEqual } from "radash"
import { LocationType, SearchFilters, SearchFormData } from "../types"
import { SEARCH_FILTERS_PARSER } from "./constants"
import { useSearchFilters } from "./useSearchFilters"

export function useSearchForm() {
    const { searchFilters, setSearchFilters } = useSearchFilters()

    return {
        loadFromUrl: () => filtersToFormData(searchFilters),
        submit: (data: SearchFormData) => {
            const filters = formDataToFilters(data)
            filters.after = null

            const update = removeDefaultFilters(filters)
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

export function formDataToFilters(data: SearchFormData): SearchFilters {
    const locTypes = [] as LocationType[]
    if (data.locationTypes.hybrid) locTypes.push("hybrid")
    if (data.locationTypes.onsite) locTypes.push("onsite")
    if (data.locationTypes.remote) locTypes.push("remote")

    return {
        after: data.after,
        text: data.text,
        clearance: data.clearance === "" ? null : data.clearance,
        salary: data.salary,
        "location-types": locTypes,
        "yoe-minimum": data.yoe.minimum,
        "yoe-ignore-null": data.yoe.ignoreNull,

        "skills-included": data.skills.include.map(({ id }) => id),
        "skills-excluded": data.skills.exclude.map(({ id }) => id),

        "duties-included": data.duties.include.map(({ id }) => id),
        "duties-excluded": data.duties.exclude.map(({ id }) => id),

        cities: data.locations.cities,
        states: data.locations.states,
    }
}

export function removeDefaultFilters(
    filters: SearchFilters
): Nullified<SearchFilters> {
    const update: Nullified<SearchFilters> = { ...filters }

    Object.keys(SEARCH_FILTERS_PARSER).forEach((k) => {
        const key = k as keyof typeof SEARCH_FILTERS_PARSER
        const parser = SEARCH_FILTERS_PARSER[key]
        if (
            "defaultValue" in parser &&
            isEqual(parser.defaultValue, update[key])
        ) {
            update[key] = null
        }
    })

    return update
}
