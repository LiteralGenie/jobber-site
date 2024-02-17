import { useMemo } from "react"
import {
    Controller,
    ControllerRenderProps,
    UseFormReturn,
} from "react-hook-form"
import { SkillDto } from "../api/skills/route"
import MultiSelect from "./multi-select"
import { SearchFormData } from "./types"

type Field<T extends "skills.include" | "skills.exclude" = any> =
    ControllerRenderProps<SearchFormData<"">, T>

export interface SkillFilterProps {
    skills: SkillDto[]
    form: UseFormReturn<SearchFormData>
}

export function SkillFilter({ skills, form }: SkillFilterProps) {
    const { control, watch } = form
    const included = watch("skills.include")
    const excluded = watch("skills.exclude")

    const options = useMemo(
        () =>
            skills.map(({ id, name }) => ({
                value: id.toString(),
                name,
            })),
        [skills]
    )

    function handleChange(field: Field, ids: string[]) {
        field.onChange(
            ids.map((v) => ({
                id: parseInt(v),
            }))
        )
    }

    return (
        <section>
            <h1>Skills</h1>

            <div className="flex flex-col gap-6">
                <Controller
                    name="skills.include"
                    control={control}
                    render={({ field }) => (
                        <MultiSelect
                            id="skills-included"
                            options={options}
                            disabledOptions={excluded.map((v) =>
                                v.id.toString()
                            )}
                            value={included.map((v) => v.id.toString())}
                            label="Included"
                            ariaLabel="Skills Included"
                            onChange={(ids) => handleChange(field, ids)}
                        />
                    )}
                />

                <Controller
                    name="skills.exclude"
                    control={control}
                    render={({ field }) => (
                        <MultiSelect
                            id="skills-excluded"
                            options={options}
                            disabledOptions={included.map((v) =>
                                v.id.toString()
                            )}
                            value={excluded.map((v) => v.id.toString())}
                            label="Excluded"
                            ariaLabel="Skills Excluded"
                            onChange={(ids) => handleChange(field, ids)}
                        />
                    )}
                />
            </div>
        </section>
    )
}
