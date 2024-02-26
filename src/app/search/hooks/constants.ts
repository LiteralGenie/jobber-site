import {
    createSerializer,
    parseAsArrayOf,
    parseAsBoolean,
    parseAsInteger,
    parseAsString,
    parseAsStringEnum,
} from "nuqs"
import { LocationType, SearchFilters, SearchFormData } from "../types"

export const SEARCH_FORM_DEFAULT = () =>
    ({
        after: null,

        skills: {
            include: [],
            exclude: [],
        },
        duties: {
            include: [],
            exclude: [],
        },
        locationTypes: {
            hybrid: false,
            onsite: false,
            remote: false,
        },
        locations: {
            cities: [],
            states: [],
        },
        yoe: {
            minimum: 0,
            ignoreNull: false,
        },
        text: "",
        salary: 0,
        clearance: "",
    } as SearchFormData)

const d = SEARCH_FORM_DEFAULT()

const defaultLocationTypes = Object.entries(d.locationTypes)
    .filter(([_, v]) => !!v)
    .map(([k, _]) => k) as LocationType[]

export const SEARCH_FILTERS_PARSER = {
    after: parseAsInteger,
    text: parseAsString.withDefault(d.text),
    salary: parseAsInteger.withDefault(d.salary),
    clearance:
        d.clearance === ""
            ? parseAsBoolean
            : parseAsBoolean.withDefault(d.clearance),
    "location-types": parseAsArrayOf(
        parseAsStringEnum(["hybrid", "onsite", "remote"] as const)
    ).withDefault(defaultLocationTypes),
    "skills-included": parseAsArrayOf(parseAsInteger).withDefault(
        d.skills.include.map((v) => v.id)
    ),
    "skills-excluded": parseAsArrayOf(parseAsInteger).withDefault(
        d.skills.exclude.map((v) => v.id)
    ),
    "duties-included": parseAsArrayOf(parseAsInteger).withDefault(
        d.duties.include.map((v) => v.id)
    ),
    "duties-excluded": parseAsArrayOf(parseAsInteger).withDefault(
        d.duties.exclude.map((v) => v.id)
    ),
    cities: parseAsArrayOf(parseAsInteger).withDefault(d.locations.cities),
    states: parseAsArrayOf(parseAsString).withDefault(d.locations.states),
    "yoe-minimum": parseAsInteger.withDefault(d.yoe.minimum),
    "yoe-ignore-null": parseAsBoolean.withDefault(d.yoe.ignoreNull),
}

export const SEARCH_FILTER_SERIALIZER = createSerializer(SEARCH_FILTERS_PARSER)

export const EMPTY_FILTERS: Record<keyof SearchFilters, null> = {
    after: null,
    text: null,
    salary: null,
    clearance: null,
    "location-types": null,
    "skills-included": null,
    "skills-excluded": null,
    "duties-included": null,
    "duties-excluded": null,
    cities: null,
    states: null,
    "yoe-minimum": null,
    "yoe-ignore-null": null,
}
