import { useQueryStates } from "nuqs"
import { SearchFilters } from "../types"
import { SEARCH_FILTERS_PARSER } from "./constants"

export type UseSearchFiltersReturn = ReturnType<typeof useSearchFilters>

export function useSearchFilters() {
    const [searchFilters, setSearchFilters] = useQueryStates(
        SEARCH_FILTERS_PARSER,
    ) satisfies [SearchFilters, any]

    return { searchFilters, setSearchFilters }
}
