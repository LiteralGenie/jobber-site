import { STATE_ABBREVIATIONS } from "@/lib/format-utils"
import { Autocomplete, TextField } from "@mui/material"
import { alphabetical, group } from "radash"
import { useMemo } from "react"
import {
    Controller,
    ControllerRenderProps,
    UseFormReturn,
} from "react-hook-form"
import { LocationDto } from "../api/locations/route"
import { SearchFormData } from "./types"

export interface LocationFilterProps {
    form: UseFormReturn<SearchFormData>
    locations: LocationDto[]
}

type CityOption = {
    id_city: number
    city: string
    state: string
    count: number
}

type StateOption = {
    state: string
    count: number
}

type CityOrStateOption = CityOption | StateOption

type OptionMap = Record<
    string,
    { stateOption: StateOption; cityOptions: CityOption[] }
>

type LocationMap = Record<LocationDto["id"], LocationDto>

type Field = ControllerRenderProps<SearchFormData, "locations">

function getOptionLabel(opt: CityOrStateOption): string {
    if ("city" in opt) {
        const stateAbbrv = STATE_ABBREVIATIONS[opt.state] || opt.state
        return `${opt.city}, ${stateAbbrv} (${opt.count})`
    } else {
        return `${opt.state} (${opt.count})`
    }
}

function upsertOption(list: OptionMap, loc: LocationDto): OptionMap {
    const { state, city } = loc

    if (!(state in list)) {
        list[state] = {
            stateOption: {
                state: state,
                count: 0,
            },
            cityOptions: [],
        }
    }

    list[state].stateOption.count += loc.count

    if (city) {
        list[state].cityOptions.push({
            id_city: loc.id,
            city: city,
            state: state,
            count: loc.count,
        })
    }

    return list
}

function readFormValue(
    value: SearchFormData["locations"],
    optionMap: OptionMap,
    locationMap: LocationMap
): CityOrStateOption[] {
    const states = value.states.map((state) => optionMap[state].stateOption)
    const cities = value.cities.map((id) => {
        const city = locationMap[id]
        const option = optionMap[city.state].cityOptions.find(
            (opt) => opt.id_city === id
        ) as CityOption
        return option
    })

    return [...states, ...cities]
}

function setFormValue(options: CityOrStateOption[], field: Field) {
    const grouped = group(options, (opt) =>
        "city" in opt ? "cities" : "states"
    ) as { cities: CityOption[]; states: StateOption[] }

    const update: SearchFormData["locations"] = {
        states: grouped.states?.map((opt) => opt.state) || [],
        cities: grouped.cities?.map((opt) => opt.id_city) || [],
    }

    field.onChange(update)
}

export function LocationFilter({ form, locations }: LocationFilterProps) {
    const { control } = form

    const locationMap = useMemo(
        () => Object.fromEntries(locations.map((loc) => [loc.id, loc])),
        [locations]
    )

    // Group locations by state and get total tally per state
    const optionMap = useMemo(
        () =>
            locations.reduce(
                (acc, loc) => upsertOption(acc, loc),
                {} as OptionMap
            ),
        [locations]
    )

    // Sort by state name and flatten
    const options: Array<CityOrStateOption> = useMemo(() => {
        let byState: Array<OptionMap[string]> = Object.values(optionMap)
        byState = alphabetical(byState, (opt) => opt.stateOption.state)

        const flattened = byState.flatMap((opt) => [
            opt.stateOption,
            ...opt.cityOptions,
        ])

        return flattened
    }, [optionMap])

    return (
        <Controller
            name="locations"
            control={control}
            render={({ field }) => (
                <Autocomplete
                    multiple
                    value={readFormValue(field.value, optionMap, locationMap)}
                    options={options}
                    getOptionLabel={getOptionLabel}
                    onChange={(_, value) => setFormValue(value, field)}
                    className="px-2"
                    renderInput={(params) => (
                        // @fixme: this params spread causes a key error
                        //         but maybe a next.js issue
                        //         https://github.com/vercel/next.js/issues/55642#issuecomment-1806788416
                        <TextField
                            {...params}
                            variant="standard"
                            label="Locations"
                        />
                    )}
                />
            )}
        />
    )
}
