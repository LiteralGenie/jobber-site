"use-client"

import {
    Button,
    Checkbox,
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
import { Duty } from "../api/duties/route"
import { Skill } from "../api/skills/route"
import { useQueryParams } from "../useQueryParams"
import MultiSelect from "./multi-select"
import styles from "./search.module.scss"
import { SearchFormData } from "./types"
import { deserializeParams, useSearchForm } from "./useSearchForm"

export interface SearchProps {
    duties: Duty[]
    skills: Skill[]
}

export default function Search({ duties, skills }: SearchProps) {
    const queryParams = useQueryParams()

    const { getInitialValue, serializeForm } = useSearchForm()

    const { register, getValues, watch, setValue } = useForm<SearchFormData>({
        defaultValues: getInitialValue(
            {
                skills: {
                    include: [],
                    exclude: [],
                },
                duties: {
                    include: [],
                    exclude: [],
                },
                locations: {
                    hybrid: false,
                    onsite: false,
                    remote: false,
                },
                text: "",
                salary: 0,
                clearance: "any",
            },
            deserializeParams(queryParams.get())
        ),
    })

    const skillsIncluded = watch("skills.include")
    const skillsExcluded = watch("skills.exclude")

    const dutiesIncluded = watch("duties.include")
    const dutiesExcluded = watch("duties.exclude")

    // POST form data and update query params
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const update = serializeForm(getValues())
        update.delete("after")
        queryParams.set(update)
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

            <hr />

            {/* Filters */}
            <section>
                {/* Skills */}
                <section>
                    <h1>Skills</h1>

                    <div className="flex flex-col gap-6">
                        <MultiSelect
                            id="skills-included"
                            options={skills.map(({ id, name }) => ({
                                value: id.toString(),
                                name,
                            }))}
                            disabledOptions={skillsExcluded.map((v) =>
                                v.id.toString()
                            )}
                            initialValue={skillsIncluded.map((v) =>
                                v.id.toString()
                            )}
                            label="Included"
                            ariaLabel="Skills Included"
                            onChange={(vals) =>
                                setValue(
                                    "skills.include",
                                    vals.map((v) => ({
                                        id: parseInt(v),
                                    }))
                                )
                            }
                        />

                        <MultiSelect
                            id="skills-excluded"
                            options={skills.map(({ id, name }) => ({
                                value: id.toString(),
                                name,
                            }))}
                            disabledOptions={skillsIncluded.map((v) =>
                                v.id.toString()
                            )}
                            initialValue={skillsExcluded.map((v) =>
                                v.id.toString()
                            )}
                            label="Excluded"
                            ariaLabel="Skills Excluded"
                            onChange={(vals) =>
                                setValue(
                                    "skills.exclude",
                                    vals.map((v) => ({
                                        id: parseInt(v),
                                    }))
                                )
                            }
                        />
                    </div>
                </section>

                <hr />

                {/* Responsibilities */}
                <section>
                    <h1>Responsibilities</h1>

                    <div className="flex flex-col gap-6">
                        <MultiSelect
                            id="duties-included"
                            options={duties.map(({ id, name }) => ({
                                value: id.toString(),
                                name,
                            }))}
                            disabledOptions={dutiesExcluded.map((v) =>
                                v.id.toString()
                            )}
                            initialValue={dutiesIncluded.map((v) =>
                                v.id.toString()
                            )}
                            label="Included"
                            ariaLabel="Responsibilities Included"
                            onChange={(vals) =>
                                setValue(
                                    "duties.include",
                                    vals.map((v) => ({
                                        id: parseInt(v),
                                    }))
                                )
                            }
                        />

                        <MultiSelect
                            id="duties-excluded"
                            options={duties.map(({ id, name }) => ({
                                value: id.toString(),
                                name,
                            }))}
                            disabledOptions={dutiesIncluded.map((v) =>
                                v.id.toString()
                            )}
                            initialValue={dutiesExcluded.map((v) =>
                                v.id.toString()
                            )}
                            label="Excluded"
                            ariaLabel="Responsibilities Excluded"
                            onChange={(vals) =>
                                setValue(
                                    "duties.exclude",
                                    vals.map((v) => ({
                                        id: parseInt(v),
                                    }))
                                )
                            }
                        />
                    </div>
                </section>

                <hr />

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

            <div className="flex justify-end py-4">
                <Button variant="outlined">Reset</Button>
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </div>
        </form>
    )
}
