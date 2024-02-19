import { Checkbox, FormControlLabel, FormGroup, FormLabel } from "@mui/material"
import { Controller, UseFormReturn } from "react-hook-form"
import { SearchFormData } from "./types"

export interface LocationFilterProps {
    form: UseFormReturn<SearchFormData>
}

export function LocationFilter({ form }: LocationFilterProps) {
    return (
        <FormGroup>
            <FormLabel id="location">Location</FormLabel>
            <FormControlLabel
                control={<Option form={form} name="locations.onsite" />}
                label="On-site"
            />
            <FormControlLabel
                control={<Option form={form} name="locations.hybrid" />}
                label="Hybrid"
            />
            <FormControlLabel
                control={<Option form={form} name="locations.remote" />}
                label="Remote"
            />
        </FormGroup>
    )
}

interface OptionProps {
    form: UseFormReturn<SearchFormData>
    name: "locations.onsite" | "locations.hybrid" | "locations.remote"
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
