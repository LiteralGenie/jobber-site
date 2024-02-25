import { useFormContext } from "@/lib/providers/form-provider"
import {
    Checkbox,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    TextField,
} from "@mui/material"
import { Controller } from "react-hook-form"

export function YoeFilter() {
    const {
        form: { control, register },
    } = useFormContext()

    return (
        <section>
            <div className="pb-4">
                <FormLabel>Experience</FormLabel>
            </div>

            <div className="flex flex-col">
                <TextField
                    type="number"
                    label="Minimum"
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                years
                            </InputAdornment>
                        ),
                        inputProps: {
                            min: 0,
                        },
                    }}
                    aria-label="Minimum years of experience"
                    sx={{
                        ".MuiInputBase-root": {
                            paddingTop: "0.25rem",
                            paddingBottom: "0.25rem",
                        },
                    }}
                    {...register("yoe.minimum")}
                />

                <Controller
                    name="yoe.ignoreNull"
                    control={control}
                    render={({ field: { value, ...field } }) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    size="small"
                                    checked={!!value}
                                    {...field}
                                />
                            }
                            label="Ignore if unspecified"
                            className="pt-2"
                            title="Exclude posts that don't specify a minimum amount of experience"
                        />
                    )}
                />
            </div>
        </section>
    )
}
