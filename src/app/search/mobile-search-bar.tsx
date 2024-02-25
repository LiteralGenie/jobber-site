import { useFormContext } from "@/lib/providers/form-provider"
import {
    ArrowForwardOutlined,
    FilterAltOutlined,
    SearchOutlined,
} from "@mui/icons-material"
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import { SearchDialog } from "./search-dialog"

export default function MobileSearchBar() {
    const {
        form: { register },
        handleSubmit,
        handleReset,
    } = useFormContext()

    const [showFilters, setShowFilters] = useState(false)

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
                >
                    test
                </TextField>

                <IconButton onClick={() => setShowFilters(true)}>
                    <FilterAltOutlined />
                </IconButton>
            </form>

            <SearchDialog open={showFilters} onClose={handleClose} />
        </>
    )
}
