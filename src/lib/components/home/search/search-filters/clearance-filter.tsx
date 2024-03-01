import { useFormContext } from "@/lib/providers/form-provider"
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material"
import { Controller } from "react-hook-form"
import { SearchFormData } from "../types"

export function ClearanceFilter() {
    const {
        form: { control },
    } = useFormContext()

    function handleChange(
        onChange: (update: SearchFormData["clearance"]) => void,
        value: string
    ) {
        switch (value) {
            case "false":
                onChange(false)
                break
            case "true":
                onChange(true)
                break
            default:
                onChange("")
                break
        }
    }

    return (
        <Controller
            name="clearance"
            control={control}
            render={({ field: { onChange, ...field } }) => (
                <FormControl>
                    <FormLabel id="clearance">Clearance</FormLabel>
                    <RadioGroup
                        aria-labelledby="clearance"
                        defaultValue={""}
                        {...field}
                        onChange={(ev, value) => handleChange(onChange, value)}
                    >
                        <FormControlLabel
                            value={""}
                            control={<Radio className="py-1" />}
                            label="Any"
                        />
                        <FormControlLabel
                            value={false}
                            control={<Radio className="py-1" />}
                            label="Not required"
                        />
                        <FormControlLabel
                            value={true}
                            control={<Radio className="py-1" />}
                            label="Required"
                        />
                    </RadioGroup>
                </FormControl>
            )}
        />
    )
}
