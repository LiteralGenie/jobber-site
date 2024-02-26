import { useFormContext } from "@/lib/providers/form-provider"
import { FormLabel } from "@mui/material"
import { DutyDto } from "../../api/duties/handler"
import MultiSelect from "../multi-select"

export interface DutyFilterProps {
    duties: DutyDto[]
}

export function DutyFilter({ duties }: DutyFilterProps) {
    const { form } = useFormContext()
    const included = form.watch("duties.include")
    const excluded = form.watch("duties.exclude")

    return (
        <section>
            <div className="pb-4">
                <FormLabel>Responsibilities</FormLabel>
            </div>

            <div className="flex flex-col gap-4">
                <MultiSelect
                    form={form}
                    controlName="duties.include"
                    options={duties}
                    disabledOptions={excluded.map((v) => v.id)}
                    label="Include"
                    ariaLabel="Duties Included"
                />

                <MultiSelect
                    form={form}
                    controlName="duties.exclude"
                    options={duties}
                    disabledOptions={included.map((v) => v.id)}
                    label="Exclude"
                    ariaLabel="Duties Excluded"
                />
            </div>
        </section>
    )
}
