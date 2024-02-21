import { FormLabel } from "@mui/material"
import { UseFormReturn } from "react-hook-form"
import { DutyDto } from "../api/duties/handler"
import MultiSelect from "./multi-select"
import { SearchFormData } from "./types"

export interface DutyFilterProps {
    duties: DutyDto[]
    form: UseFormReturn<SearchFormData>
}

export function DutyFilter({ duties, form }: DutyFilterProps) {
    const { watch } = form
    const included = watch("duties.include")
    const excluded = watch("duties.exclude")

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
