import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material"
import { Controller, UseFormReturn } from "react-hook-form"
import { SearchFormData } from "./types"

export interface ClearanceFilterProps {
    form: UseFormReturn<SearchFormData>
}

export function ClearanceFilter({ form }: ClearanceFilterProps) {
    const { control } = form

    return (
        <Controller
            name="clearance"
            control={control}
            render={({ field }) => (
                <FormControl>
                    <FormLabel id="clearance">Clearance</FormLabel>
                    <RadioGroup
                        aria-labelledby="clearance"
                        defaultValue="any"
                        {...field}
                    >
                        <FormControlLabel
                            value="any"
                            control={<Radio className="py-1" />}
                            label="Any"
                        />
                        <FormControlLabel
                            value="no"
                            control={<Radio className="py-1" />}
                            label="Not required"
                        />
                        <FormControlLabel
                            value="yes"
                            control={<Radio className="py-1" />}
                            label="Required"
                        />
                    </RadioGroup>
                </FormControl>
            )}
        />
    )
}
