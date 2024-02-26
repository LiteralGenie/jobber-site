import { useFormContext } from "@/lib/providers/form-provider"
import {
    Circle,
    Close,
    SearchOutlined,
    TuneOutlined,
} from "@mui/icons-material"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { useMemo, useState } from "react"
import { useSearchFilters } from "../search/hooks/useSearchFilters"
import { removeDefaultFilters } from "../search/hooks/useSearchForm"
import { SearchDialog } from "../search/search-dialog"

export interface SearchBarProps {
    wide?: boolean
}

export default function SearchBar({ wide }: SearchBarProps) {
    const {
        form: { register, setValue, watch },
        handleSubmit,
        handleReset,
    } = useFormContext()

    const [showFilters, setShowFilters] = useState(false)

    const textValue = watch("text")

    // Show dot on show-filter button if any are active
    const { searchFilters } = useSearchFilters()
    const hasChanges = useMemo(() => {
        // Ignore text (already visible outside dialog) and cursor (not a configurable filter)
        const filters = { ...searchFilters, text: "", after: null }
        const nullified = removeDefaultFilters(filters)
        return Object.values(nullified).some((val) => val !== null)
    }, [searchFilters])

    function handleClose() {
        setShowFilters(false)
        handleReset()
    }

    return (
        <>
            <form
                onSubmit={(ev) => {
                    ev.preventDefault()
                    handleSubmit()
                }}
                className="flex justify-center items-center gap-2"
            >
                <TextField
                    {...register("text")}
                    className={`w-full ${wide ? "w-full" : "max-w-md"}`}
                    placeholder="software (dev|eng).*"
                    size="small"
                    aria-label="Text to search for"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlined />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <div className="flex pr-1">
                                {textValue && (
                                    <IconButton
                                        onClick={() => {
                                            setValue("text", "")
                                            handleSubmit()
                                        }}
                                        className="p-1"
                                    >
                                        <Close className="w-4" />
                                    </IconButton>
                                )}

                                <IconButton
                                    onClick={() => setShowFilters(true)}
                                    className="p-1 mr-1"
                                    aria-label="Search"
                                >
                                    <div className="relative flex">
                                        {hasChanges && (
                                            <Circle
                                                sx={{
                                                    color: (theme) =>
                                                        theme.palette.primary
                                                            .main,
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    transform:
                                                        "translateY(-30%) translateX(40%) scale(0.5)",
                                                }}
                                            />
                                        )}
                                        <TuneOutlined
                                            color={
                                                hasChanges
                                                    ? "primary"
                                                    : "inherit"
                                            }
                                        />
                                    </div>
                                </IconButton>
                            </div>
                        ),
                    }}
                    sx={{
                        ".Mui-focused": {
                            ".MuiInputAdornment-root, .MuiButtonBase-root": {
                                color: (theme) => theme.palette.primary.main,
                            },
                        },
                        ".MuiInputBase-root": {
                            paddingRight: 0,
                        },
                    }}
                />
            </form>

            <SearchDialog open={showFilters} onClose={handleClose} />
        </>
    )
}
