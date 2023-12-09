"use-client"

import { usePathname, useRouter } from "next/navigation"
import { FormEvent } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import styles from "./search.module.scss"

interface SearchForm {
    skills: {
        include: Array<{
            name: string
            yoe: number
        }>
        exclude: { name: string }[]
    }
    responsibilities: {
        include: { value: string }[]
        exclude: { value: string }[]
    }
    salary: number
    clearance: "any" | "no" | "yes"
}

interface SearchParams {}

export default function Search() {
    const router = useRouter()
    const pathName = usePathname()

    const { control, register } = useForm<SearchForm>({
        defaultValues: {
            skills: {
                include: [
                    {
                        name: "",
                        yoe: 0,
                    },
                ],
                exclude: [{ name: "" }],
            },
            responsibilities: {
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
        name: "responsibilities.include",
    })
    const respsExcluded = useFieldArray({
        control,
        name: "responsibilities.exclude",
    })

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const raw = new FormData(event.currentTarget)
        const urlParams: any = {} // @todo

        const text = raw.get("text") as string
        if (text.length) {
            urlParams["text"] = text
        }

        if (raw.get("clearance-no")) {
            urlParams["clearance"] = false
        } else if (raw.get("clearance-yes")) {
            urlParams["clearance"] = true
        }

        const salary = raw.get("salary") as string
        if (salary) {
            urlParams["salary"] = salary
        }

        const namesIncluded = raw.getAll("include-skill-name") as string[]
        const yoeIncluded = raw.getAll("include-skill-yoe") as string[]
        const skillsIncluded = namesIncluded.flatMap((name, idx) => {
            if (!name.length) {
                return []
            }

            const yoe = yoeIncluded[idx]

            return [`${name},${yoe}`]
        })
        if (skillsIncluded.length) {
            urlParams["include-skills"] = skillsIncluded
        }

        const skillsExcluded = raw
            .getAll("exclude-skill")
            .filter((text) => (text as string).length)

        if (skillsExcluded.length) {
            urlParams["exclude-skills"] = skillsExcluded
        }

        const respsIncluded = raw
            .getAll("include-responsibility")
            .filter((text) => (text as string).length)
        if (respsIncluded.length) {
            urlParams["include-resps"] = respsIncluded
        }

        const respsExcluded = raw
            .getAll("exclude-responsibility")
            .filter((text) => (text as string).length)
        if (respsExcluded.length) {
            urlParams["exclude-resps"] = respsExcluded
        }

        const paramString = new URLSearchParams(urlParams).toString()
        console.log("onSubmit", urlParams, paramString)
        router.push(`${pathName}?${paramString}`)
    }

    return (
        <form onSubmit={(ev) => onSubmit(ev)} className={styles["search-form"]}>
            {/* Query text */}
            <section>
                <input
                    name="text"
                    type="text"
                    placeholder="software (developer|engineer)"
                    className="w-full"
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
                                <div className="flex gap-2">
                                    <select
                                        key={field.id}
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
                                        key={field.id}
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
                                <div className="flex gap-2">
                                    <select
                                        key={field.id}
                                        className="flex-1"
                                        {...register(
                                            `responsibilities.include.${idx}.value`
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

                            {...respsIncluded.fields.map((field, idx) => (
                                <div className="flex gap-2">
                                    <select
                                        key={field.id}
                                        className="flex-1"
                                        {...register(
                                            `responsibilities.exclude.${idx}.value`
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
                                    name="clearance-any"
                                    type="radio"
                                    value="0"
                                    checked
                                />
                                <label htmlFor="clearance-any">Any</label>
                            </div>

                            <div>
                                <input
                                    name="clearance-no"
                                    type="radio"
                                    value="1"
                                />
                                <label htmlFor="clearance-no">No</label>
                            </div>

                            <div>
                                <input
                                    name="clearance-yes"
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
