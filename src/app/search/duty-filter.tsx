import { FormLabel } from "@mui/material"
import { useMemo } from "react"
import {
    Controller,
    ControllerRenderProps,
    UseFormReturn,
} from "react-hook-form"
import { DutyDto } from "../api/duties/route"
import MultiSelect from "./multi-select"
import { SearchFormData } from "./types"

type Field<T extends "duties.include" | "duties.exclude" = any> =
    ControllerRenderProps<SearchFormData, T>

export interface DutyFilterProps {
    duties: DutyDto[]
    form: UseFormReturn<SearchFormData>
}

export function DutyFilter({ duties, form }: DutyFilterProps) {
    const { control, watch } = form
    const included = watch("duties.include")
    const excluded = watch("duties.exclude")

    const options = useMemo(
        () =>
            duties.map(({ id, name }) => ({
                value: id.toString(),
                name,
            })),
        [duties]
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
            <div className="pb-4">
                <FormLabel>Responsibilities</FormLabel>
            </div>

            <div className="flex flex-col gap-4">
                <Controller
                    name="duties.include"
                    control={control}
                    render={({ field }) => (
                        <MultiSelect
                            id="duties-included"
                            options={options}
                            disabledOptions={excluded.map((v) =>
                                v.id.toString()
                            )}
                            value={included.map((v) => v.id.toString())}
                            label="Included"
                            ariaLabel="Duties Included"
                            onChange={(ids) => handleChange(field, ids)}
                        />
                    )}
                />

                <Controller
                    name="duties.exclude"
                    control={control}
                    render={({ field }) => (
                        <MultiSelect
                            id="duties-excluded"
                            options={options}
                            disabledOptions={included.map((v) =>
                                v.id.toString()
                            )}
                            value={excluded.map((v) => v.id.toString())}
                            label="Excluded"
                            ariaLabel="Duties Excluded"
                            onChange={(ids) => handleChange(field, ids)}
                        />
                    )}
                />
            </div>
        </section>
    )
}
