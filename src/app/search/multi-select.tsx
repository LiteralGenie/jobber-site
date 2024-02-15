// https://mui.com/material-ui/react-select/#chip

import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import OutlinedInput from "@mui/material/OutlinedInput"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useMemo, useState } from "react"

export interface MultiSelectProps {
    id: string
    options: { value: string; name: string }[]
    disabledOptions: string[]
    initialValue: string[]
    label: string
    ariaLabel: string
    onChange: (selected: string[]) => void
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

export default function MultiSelect({
    id,
    options,
    disabledOptions,
    initialValue,
    label,
    ariaLabel,
    onChange,
}: MultiSelectProps) {
    const [selected, setSelected] = useState(initialValue)

    const valueNameMap = useMemo(
        () =>
            options.reduce(
                (acc, { value, name }) => ({ ...acc, [value]: name }),
                {} as Record<string, string>
            ),
        [options]
    )

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event

        const update = typeof value === "string" ? value.split(",") : value
        setSelected(update)
        onChange(update)
    }

    return (
        <FormControl className="w-full">
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                multiple
                value={selected}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                renderValue={(sel) => (
                    <Box className="flex flex-wrap gap-1">
                        {sel.map((value) => (
                            <Chip key={value} label={valueNameMap[value]} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                aria-label={ariaLabel}
            >
                {options.map(({ value, name }) => (
                    <MenuItem
                        key={value}
                        value={value}
                        disabled={disabledOptions.includes(value)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
