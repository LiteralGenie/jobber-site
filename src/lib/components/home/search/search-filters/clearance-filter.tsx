import { useFormContext } from "@/lib/providers/form-provider"
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material"
import { Controller } from "react-hook-form"

export function ClearanceFilter() {
    const {
        form: { control },
    } = useFormContext()

    return (
        <Controller
            name="clearance"
            control={control}
            render={({ field }) => (
                <FormControl>
                    <FormLabel id="clearance">Clearance</FormLabel>
                    <RadioGroup
                        aria-labelledby="clearance"
                        defaultValue={null}
                        {...field}
                    >
                        <FormControlLabel
                            value={""}
                            control={<Radio className="py-1" />}
                            label="Any"
                            onChange={(ev, checked) => {
                                if (checked) {
                                    field.onChange("")
                                }
                            }}
                        />
                        <FormControlLabel
                            value={false}
                            control={<Radio className="py-1" />}
                            label="Not required"
                            onChange={(ev, checked) => {
                                if (checked) {
                                    field.onChange(false)
                                }
                            }}
                        />
                        <FormControlLabel
                            value={true}
                            control={<Radio className="py-1" />}
                            label="Required"
                            onChange={(ev, checked) => {
                                if (checked) {
                                    field.onChange(true)
                                }
                            }}
                        />
                    </RadioGroup>
                </FormControl>
            )}
        />
    )
}
