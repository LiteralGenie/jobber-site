"use-client"

import {
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material"
import { FormEvent } from "react"
import { useForm } from "react-hook-form"
import { DutyDto } from "../api/duties/route"
import { SkillDto } from "../api/skills/route"
import { useQueryParams } from "../useQueryParams"
import { DutyFilter } from "./duty-filter"
import styles from "./search.module.scss"
import { SkillFilter } from "./skill-filter"
import { SearchFormData } from "./types"
import { useSearchForm } from "./useSearchForm"

export interface SearchProps {
    duties: DutyDto[]
    skills: SkillDto[]
}

export default function Search({ duties, skills }: SearchProps) {
    const queryParams = useQueryParams()

    const { getDefaultFromUrl, serializeForm } = useSearchForm()

    const form = useForm<SearchFormData>({
        defaultValues: getDefaultFromUrl(),
    })
    const { register, getValues, reset } = form

    // POST form data and update query params
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const update = serializeForm(getValues())
        update.delete("after")
        queryParams.set(update)
    }

    function handleReset() {
        reset()
    }

    return (
        <form
            onSubmit={(ev) => handleSubmit(ev)}
            className={styles["search-form"]}
        >
            {/* Query text */}
            <section>
                <TextField
                    label="Text"
                    variant="standard"
                    type="text"
                    placeholder="software (developer|engineer)"
                    {...register("text")}
                />
            </section>

            <Divider />

            {/* Filters */}
            <section>
                <SkillFilter skills={skills} form={form} />

                <Divider />

                <DutyFilter duties={duties} form={form} />

                <Divider />

                {/* Miscellaenous */}
                <section className="flex flex-col">
                    <div className="flex flex-col gap-4">
                        <TextField
                            label="Salary"
                            variant="standard"
                            type="number"
                            {...register("salary")}
                        />

                        <FormGroup>
                            <FormLabel id="location">Location</FormLabel>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        className="py-1"
                                        {...register("locations.onsite")}
                                    />
                                }
                                label="On-site"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        className="py-1"
                                        {...register("locations.hybrid")}
                                    />
                                }
                                label="Hybrid"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        className="py-1"
                                        {...register("locations.remote")}
                                    />
                                }
                                label="Remote"
                            />
                        </FormGroup>

                        <FormControl>
                            <FormLabel id="clearance">Clearance</FormLabel>
                            <RadioGroup
                                aria-labelledby="clearance"
                                defaultValue="any"
                            >
                                <FormControlLabel
                                    value="any"
                                    control={
                                        <Radio
                                            className="py-1"
                                            {...register("clearance")}
                                        />
                                    }
                                    label="Any"
                                />
                                <FormControlLabel
                                    value="no"
                                    control={
                                        <Radio
                                            className="py-1"
                                            {...register("clearance")}
                                        />
                                    }
                                    label="Not required"
                                />
                                <FormControlLabel
                                    value="yes"
                                    control={
                                        <Radio
                                            className="py-1"
                                            {...register("clearance")}
                                        />
                                    }
                                    label="Required"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </section>
            </section>

            <div className="py-4 flex justify-end gap-2">
                <Button variant="outlined" onClick={handleReset}>
                    Reset
                </Button>
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </div>
        </form>
    )
}
