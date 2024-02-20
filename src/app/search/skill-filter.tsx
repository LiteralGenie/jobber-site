import { FormLabel } from "@mui/material"
import { UseFormReturn } from "react-hook-form"
import { SkillDto } from "../api/skills/route"
import MultiSelect from "./multi-select"
import { SearchFormData } from "./types"

export interface SkillFilterProps {
    skills: SkillDto[]
    form: UseFormReturn<SearchFormData>
}

export function SkillFilter({ skills, form }: SkillFilterProps) {
    const { watch } = form
    const included = watch("skills.include")
    const excluded = watch("skills.exclude")

    return (
        <section>
            <div className="pb-4">
                <FormLabel>Skills</FormLabel>
            </div>

            <div className="flex flex-col gap-4">
                <MultiSelect
                    form={form}
                    controlName="skills.include"
                    options={skills}
                    disabledOptions={excluded.map((v) => v.id)}
                    label="Include"
                    ariaLabel="Skills Included"
                />

                <MultiSelect
                    form={form}
                    controlName="skills.exclude"
                    options={skills}
                    disabledOptions={included.map((v) => v.id)}
                    label="Exclude"
                    ariaLabel="Skills Excluded"
                />
            </div>
        </section>
    )
}
