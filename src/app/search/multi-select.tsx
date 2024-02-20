// https://mui.com/material-ui/react-select/#chip

import { Autocomplete, TextField } from "@mui/material"
import { useMemo } from "react"
import {
    Controller,
    ControllerRenderProps,
    UseFormReturn,
} from "react-hook-form"
import styles from "./multi-select.module.scss"
import { SearchFormData } from "./types"

type Option = { id: number; name: string }
type OptionMap = Record<Option["id"], Option>

type ControlName =
    | "skills.include"
    | "skills.exclude"
    | "duties.include"
    | "duties.exclude"

type Field = ControllerRenderProps<SearchFormData, ControlName>

export interface MultiSelectProps {
    form: UseFormReturn<SearchFormData>
    controlName: ControlName
    options: Option[]
    disabledOptions: number[]
    label: string
    ariaLabel: string
}

function readFormValue(
    value: Array<{ id: number }>,
    optionMap: OptionMap
): Option[] {
    return value.map(({ id }) => optionMap[id])
}

function setFormValue(options: Option[], field: Field) {
    field.onChange(options)
}

export default function MultiSelect({
    form,
    controlName,
    options,
    disabledOptions,
    label,
    ariaLabel,
}: MultiSelectProps) {
    const { control } = form

    const optionMap = useMemo(
        () =>
            options.reduce(
                (acc, opt) => ({ [opt.id]: opt, ...acc }),
                {} as OptionMap
            ),
        [options]
    )

    return (
        <Controller
            name={controlName}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    multiple
                    value={readFormValue(field.value, optionMap)}
                    options={options}
                    className={styles["autocomplete"]}
                    size="small"
                    getOptionLabel={(option) => option.name}
                    getOptionDisabled={(opt) =>
                        disabledOptions.includes(opt.id)
                    }
                    onChange={(_, value) => setFormValue(value, field)}
                    renderInput={(params) => (
                        // @fixme: this params spread causes a key error
                        //         but maybe a next.js issue
                        //         https://github.com/vercel/next.js/issues/55642#issuecomment-1806788416
                        <TextField
                            {...params}
                            label={label}
                            aria-label={ariaLabel}
                        />
                    )}
                />
            )}
        />
    )
}
