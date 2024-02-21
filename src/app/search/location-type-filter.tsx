import { Checkbox, FormControlLabel, FormGroup, FormLabel } from "@mui/material"
import { Controller, UseFormReturn } from "react-hook-form"
import { SearchFormData } from "./types"

export interface LocationTypeFilterProps {
    form: UseFormReturn<SearchFormData>
}

export function LocationTypeFilter({ form }: LocationTypeFilterProps) {
    return (
        <FormGroup>
            <FormLabel id="location-type">Location type</FormLabel>
            <FormControlLabel
                control={<Option form={form} name="locationTypes.onsite" />}
                label="On-site"
            />
            <FormControlLabel
                control={<Option form={form} name="locationTypes.hybrid" />}
                label="Hybrid"
            />
            <FormControlLabel
                control={<Option form={form} name="locationTypes.remote" />}
                label="Remote"
            />
        </FormGroup>
    )
}

interface OptionProps {
    form: UseFormReturn<SearchFormData>
    name:
        | "locationTypes.onsite"
        | "locationTypes.hybrid"
        | "locationTypes.remote"
}

function Option({ form, name }: OptionProps) {
    const { control } = form

    return (
        // Need to rename field.value to checked for form reset to work
        // https://stackoverflow.com/questions/68228030/material-ui-checkbox-is-not-reset-while-using-react-hook-form-reset-function
        <Controller
            control={control}
            name={name}
            render={({ field: { value, ...field } }) => (
                <Checkbox className="py-1" {...field} checked={!!value} />
            )}
        />
    )
}
