import { useFormContext } from "@/lib/providers/form-provider"
import {
    ArrowForwardOutlined,
    Circle,
    SearchOutlined,
    TuneOutlined,
} from "@mui/icons-material"
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { useMemo, useState } from "react"
import { useSearchFilters } from "./hooks/useSearchFilters"
import { removeDefaultFilters } from "./hooks/useSearchForm"
import { SearchDialog } from "./search-dialog"

export default function MobileSearchBar() {
    const {
        form: { register, watch },
        handleSubmit,
        handleReset,
    } = useFormContext()

    const [showFilters, setShowFilters] = useState(false)

    // Show dot on show-filter button if any are active
    const { searchFilters } = useSearchFilters()
    const hasChanges = useMemo(() => {
        const filters = { ...searchFilters, text: "" }
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
                className="p-4 flex justify-center items-center gap-2"
            >
                <TextField
                    {...register("text")}
                    className="w-full max-w-md"
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
                            <Button
                                color="inherit"
                                type="submit"
                                sx={{
                                    "&:hover": {
                                        color: (theme) =>
                                            theme.palette.primary.main,
                                    },
                                }}
                            >
                                <ArrowForwardOutlined />
                            </Button>
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

                <IconButton onClick={() => setShowFilters(true)}>
                    <div className="relative">
                        {hasChanges && (
                            <Circle
                                sx={{
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    transform:
                                        "translateY(-30%) translateX(40%) scale(0.5)",
                                }}
                            />
                        )}
                        <TuneOutlined
                            color={hasChanges ? "primary" : "inherit"}
                        />
                    </div>
                </IconButton>
            </form>

            <SearchDialog open={showFilters} onClose={handleClose} />
        </>
    )
}
