"use-client"

import { FormEvent } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { Duty } from "../api/duties/route"
import { Skill } from "../api/skills/route"
import { useQueryParams } from "../useQueryParams"
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

    const { control, register, getValues } = useForm<SearchFormData>({
        defaultValues: getInitialValue(
            {
                skills: {
                    include: [{ id: "" }],
                    exclude: [{ id: "" }],
                },
                duties: {
                    include: [{ id: "" }],
                    exclude: [{ id: "" }],
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

    const skillsIncluded = useFieldArray({ control, name: "skills.include" })
    const skillsExcluded = useFieldArray({ control, name: "skills.exclude" })

    const respsIncluded = useFieldArray({
        control,
        name: "duties.include",
    })
    const respsExcluded = useFieldArray({
        control,
        name: "duties.exclude",
    })

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
                <input
                    type="text"
                    placeholder="software (developer|engineer)"
                    className="w-full"
                    {...register("text")}
                />
            </section>

            <hr />

            {/* Filters */}
            <section>
                {/* Skills */}
                <section>
                    <h1>Skills</h1>

                    <div className="flex flex-col gap-2">
                        <div>
                            <h2>Include</h2>
                            {skillsIncluded.fields.map((field, idx) => (
                                <div key={field.id} className="flex gap-2">
                                    <select
                                        className="flex-1"
                                        {...register(
                                            `skills.include.${idx}.id`
                                        )}
                                    >
                                        <option value="">(empty)</option>
                                        {skills.map((sk) => (
                                            <option value={sk.id} key={sk.id}>
                                                {sk.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button>x</button>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h2>Exclude</h2>
                            {...skillsExcluded.fields.map((field, idx) => (
                                <div className="flex gap-2">
                                    <select
                                        key={field.id}
                                        className="flex-1"
                                        {...register(
                                            `skills.exclude.${idx}.id`
                                        )}
                                    >
                                        <option value="">(empty)</option>
                                        {skills.map((sk) => (
                                            <option value={sk.id} key={sk.id}>
                                                {sk.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button>x</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <hr />

                {/* Responsibilities */}
                <section>
                    <h1>Responsibilities</h1>

                    <div className="flex flex-col gap-2">
                        <div>
                            <h2>Include</h2>
                            {...respsIncluded.fields.map((field, idx) => (
                                <div key={field.id} className="flex gap-2">
                                    <select
                                        className="flex-1"
                                        {...register(
                                            `duties.include.${idx}.id`
                                        )}
                                    >
                                        <option value="">(empty)</option>
                                        {duties.map((dt) => (
                                            <option value={dt.id} key={dt.id}>
                                                {dt.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button>x</button>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h2>Exclude</h2>

                            {...respsExcluded.fields.map((field, idx) => (
                                <div key={field.id} className="flex gap-2">
                                    <select
                                        className="flex-1"
                                        {...register(
                                            `duties.exclude.${idx}.id`
                                        )}
                                    >
                                        <option value="">(empty)</option>
                                        {duties.map((dt) => (
                                            <option value={dt.id} key={dt.id}>
                                                {dt.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button>x</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <hr />

                {/* Miscellaenous */}
                <section className="flex flex-col">
                    {/* <h1>Miscellaneous</h1> */}

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <h2>Salary</h2>

                            <input
                                type="number"
                                placeholder="0"
                                className="w-full"
                                {...register("salary")}
                            />
                        </div>

                        <div>
                            <h2>Location</h2>

                            <div>
                                <input
                                    id="location-onsite"
                                    type="checkbox"
                                    {...register("locations.onsite")}
                                />
                                <label htmlFor="location-onsite">On-site</label>
                            </div>

                            <div>
                                <input
                                    id="location-hybrid"
                                    type="checkbox"
                                    {...register("locations.hybrid")}
                                />
                                <label htmlFor="location-hybrid">Hybrid</label>
                            </div>

                            <div>
                                <input
                                    id="location-remote"
                                    type="checkbox"
                                    {...register("locations.remote")}
                                />
                                <label htmlFor="location-remote">Remote</label>
                            </div>
                        </div>

                        <div>
                            <h2>Clearance Requirements</h2>

                            <div>
                                <input
                                    id="clearance-any"
                                    type="radio"
                                    value="any"
                                    {...register("clearance")}
                                />
                                <label htmlFor="clearance-any">Any</label>
                            </div>

                            <div>
                                <input
                                    id="clearance-no"
                                    type="radio"
                                    value="no"
                                    {...register("clearance")}
                                />
                                <label htmlFor="clearance-no">No</label>
                            </div>

                            <div>
                                <input
                                    id="clearance-yes"
                                    type="radio"
                                    value="yes"
                                    {...register("clearance")}
                                />
                                <label htmlFor="clearance-yes">Yes</label>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <div className="flex justify-end py-4">
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}
