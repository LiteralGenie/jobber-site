import { SkillDto } from "@/app/api/skills/handler"
import { useFormContext } from "@/lib/providers/form-provider"
import { FormLabel } from "@mui/material"
import { alphabetical } from "radash"
import { useMemo } from "react"
import MultiSelect from "../multi-select"

export interface SkillFilterProps {
    skills: SkillDto[]
}

export function SkillFilter({ skills }: SkillFilterProps) {
    const { form } = useFormContext()
    const included = form.watch("skills.include")
    const excluded = form.watch("skills.exclude")

    const options = useMemo(() => {
        let renamed = skills.map(({ id, name, count }) => ({
            id,
            name: `${name} (${count})`,
        }))

        renamed = alphabetical(renamed, ({ name }) => name)

        return renamed
    }, [skills])

    return (
        <section>
            <div className="pb-4">
                <FormLabel>Skills</FormLabel>
            </div>

            <div className="flex flex-col gap-4">
                <MultiSelect
                    form={form}
                    controlName="skills.include"
                    options={options}
                    disabledOptions={excluded.map((v) => v.id)}
                    label="Include"
                    ariaLabel="Skills Included"
                />

                <MultiSelect
                    form={form}
                    controlName="skills.exclude"
                    options={options}
                    disabledOptions={included.map((v) => v.id)}
                    label="Exclude"
                    ariaLabel="Skills Excluded"
                />
            </div>
        </section>
    )
}
