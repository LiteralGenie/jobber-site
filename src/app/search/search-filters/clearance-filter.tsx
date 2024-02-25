import { useFormContext } from "@/lib/providers/form-provider"
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material"
import { ChangeEvent } from "react"
import { Controller, ControllerRenderProps } from "react-hook-form"
import { SearchFormData } from "../types"

type Field = ControllerRenderProps<SearchFormData, "clearance">

export function ClearanceFilter() {
    const {
        form: { control },
    } = useFormContext()

    function onChange(field: Field, ev: ChangeEvent<any>, checked: boolean) {
        ev.preventDefault()

        if (!checked) {
            return
        }

        if (ev.target.value === "any") {
            field.onChange(null)
        } else {
            field.onChange(ev.target.value === "yes")
        }
    }

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
                            onChange={(ev, checked) =>
                                onChange(field, ev, checked)
                            }
                        />
                        <FormControlLabel
                            value="no"
                            control={<Radio className="py-1" />}
                            label="Not required"
                            onChange={(ev, checked) =>
                                onChange(field, ev, checked)
                            }
                        />
                        <FormControlLabel
                            value="yes"
                            control={<Radio className="py-1" />}
                            label="Required"
                            onChange={(ev, checked) =>
                                onChange(field, ev, checked)
                            }
                        />
                    </RadioGroup>
                </FormControl>
            )}
        />
    )
}
