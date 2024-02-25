import { useFormContext } from "@/lib/providers/form-provider"
import { Checkbox, FormControlLabel, FormGroup, FormLabel } from "@mui/material"
import { Controller } from "react-hook-form"

export function LocationTypeFilter() {
    return (
        <FormGroup>
            <FormLabel id="location-type">Location type</FormLabel>
            <FormControlLabel
                control={<Option name="locationTypes.onsite" />}
                label="On-site"
            />
            <FormControlLabel
                control={<Option name="locationTypes.hybrid" />}
                label="Hybrid"
            />
            <FormControlLabel
                control={<Option name="locationTypes.remote" />}
                label="Remote"
            />
        </FormGroup>
    )
}

interface OptionProps {
    name:
        | "locationTypes.onsite"
        | "locationTypes.hybrid"
        | "locationTypes.remote"
}

function Option({ name }: OptionProps) {
    const {
        form: { control },
    } = useFormContext()

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
