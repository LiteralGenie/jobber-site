"use-client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import styles from "./search.module.scss"
import { useSearchForm } from "./useSearchForm"

export default function Search() {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const { formToParams, deserializeParams } = useSearchForm()

    const { control, register, setValue } = useForm<SearchFormData>({
        defaultValues: {
            skills: {
                include: [{ name: "", yoe: 0 }],
                exclude: [{ name: "" }],
            },
            duties: {
                include: [{ value: "" }],
                exclude: [{ value: "" }],
            },
            salary: 0,
            clearance: "any",
        },
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

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const paramString = formToParams(
            new FormData(event.target as HTMLFormElement)
        ).toString()

        router.push(`${pathName}?${paramString}`)
    }

    // Load default values from query params
    useEffect(() => {
        const data = deserializeParams(searchParams)
        console.log("data", data)

        if (data.text) {
            setValue("text", data.text)
            console.log("set text")
        }

        if (data.salary) {
            setValue("salary", data.salary)
        }

        if (data.clearance) {
            setValue("clearance", data.clearance)
        }

        if (data.skills?.include.length) {
            setValue("skills.include", data.skills.include)
        }

        if (data.skills?.exclude.length) {
            setValue("skills.exclude", data.skills.exclude)
        }

        if (data.duties?.include.length) {
            setValue("duties.include", data.duties.include)
        }

        if (data.duties?.exclude.length) {
            setValue("duties.exclude", data.duties.exclude)
        }
    }, [])

    return (
        <form onSubmit={(ev) => onSubmit(ev)} className={styles["search-form"]}>
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
                                            `skills.include.${idx}.name`
                                        )}
                                    >
                                        <option value="">(empty)</option>
                                        <option value="python">Python</option>
                                        <option value="typescript">
                                            TypeScript
                                        </option>
                                        <option value="rust">Rust</option>
                                    </select>
                                    <select
                                        className="flex-1"
                                        {...register(
                                            `skills.include.${idx}.yoe`,
                                            { valueAsNumber: true }
                                        )}
                                    >
                                        <option value="0">0 years</option>
                                    </select>
                                    <button>x</button>
                                </div>
                            ))}

                            <p className={styles.instructions}>
                                "years" = years-of-experience
                                <br />
                                Listings requesting a greater amount will be
                                excluded.
                            </p>
                        </div>
                        <div>
                            <h2>Exclude</h2>
                            {...skillsExcluded.fields.map((field, idx) => (
                                <div className="flex gap-2">
                                    <select
                                        key={field.id}
                                        className="flex-1"
                                        {...register(
                                            `skills.exclude.${idx}.name`
                                        )}
                                    >
                                        <option value="">(empty)</option>
                                        <option value="python">Python</option>
                                        <option value="typescript">
                                            TypeScript
                                        </option>
                                        <option value="rust">Rust</option>
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
                                            `duties.include.${idx}.value`
                                        )}
                                    >
                                        <option value="">(empty)</option>
                                        <option value="oncall">On-call</option>
                                        <option value="design">
                                            UI Design
                                        </option>
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
                                            `duties.exclude.${idx}.value`
                                        )}
                                    >
                                        <option value="">(empty)</option>
                                        <option value="oncall">On-call</option>
                                        <option value="design">
                                            UI Design
                                        </option>
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
                    <h1>Miscellaneous</h1>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <h2>Salary</h2>

                            <input
                                name="salary"
                                type="number"
                                placeholder="0"
                                className="w-full"
                            />
                        </div>

                        <div>
                            <h2>Clearance Requirements</h2>

                            <div>
                                <input
                                    name="clearance"
                                    id="clearance-any"
                                    type="radio"
                                    value="0"
                                    defaultChecked
                                />
                                <label htmlFor="clearance-any">Any</label>
                            </div>

                            <div>
                                <input
                                    name="clearance"
                                    id="clearance-no"
                                    type="radio"
                                    value="1"
                                />
                                <label htmlFor="clearance-no">No</label>
                            </div>

                            <div>
                                <input
                                    name="clearance"
                                    id="clearance-yes"
                                    type="radio"
                                    value="2"
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
