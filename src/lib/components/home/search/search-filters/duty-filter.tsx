import { DutyDto } from "@/app/api/duties/handler"
import { useFormContext } from "@/lib/providers/form-provider"
import { FormLabel } from "@mui/material"
import { useMemo } from "react"
import MultiSelect from "../multi-select"

export interface DutyFilterProps {
    duties: DutyDto[]
}

export function DutyFilter({ duties }: DutyFilterProps) {
    const { form } = useFormContext()
    const included = form.watch("duties.include")
    const excluded = form.watch("duties.exclude")

    const options = useMemo(
        () =>
            duties.map(({ id, name, count }) => ({
                id,
                name: `${name} (${count})`,
            })),
        [duties]
    )

    return (
        <section>
            <div className="pb-4">
                <FormLabel>Responsibilities</FormLabel>
            </div>

            <div className="flex flex-col gap-4">
                <MultiSelect
                    form={form}
                    controlName="duties.include"
                    options={options}
                    disabledOptions={excluded.map((v) => v.id)}
                    label="Include"
                    ariaLabel="Duties Included"
                />

                <MultiSelect
                    form={form}
                    controlName="duties.exclude"
                    options={options}
                    disabledOptions={included.map((v) => v.id)}
                    label="Exclude"
                    ariaLabel="Duties Excluded"
                />
            </div>
        </section>
    )
}
