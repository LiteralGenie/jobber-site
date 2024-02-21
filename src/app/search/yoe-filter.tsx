import {
    Checkbox,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    TextField,
} from "@mui/material"
import { Controller, UseFormReturn } from "react-hook-form"
import { SearchFormData } from "./types"

export interface YoeFilterProps {
    form: UseFormReturn<SearchFormData>
}

export function YoeFilter({ form }: YoeFilterProps) {
    const { control, register } = form

    return (
        <section>
            <div className="pb-4">
                <FormLabel>Experience</FormLabel>
            </div>

            <TextField
                type="number"
                label="Minimum"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">years</InputAdornment>
                    ),
                }}
                aria-label="Minimum years of experience"
                {...register("yoe.minimum")}
            />

            <Controller
                name="yoe.ignoreNull"
                control={control}
                render={({ field: { value, ...field } }) => (
                    <FormControlLabel
                        control={<Checkbox {...field} checked={!!value} />}
                        label="Ignore if unspecified"
                        className="pt-2"
                        title="Exclude posts that don't specify a minimum amount of experience"
                    />
                )}
            />
        </section>
    )
}
