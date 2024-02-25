import {
    ArrowForwardOutlined,
    FilterAltOutlined,
    SearchOutlined,
} from "@mui/icons-material"
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSearchForm } from "./hooks/useSearchForm"
import { SearchDialog } from "./search-dialog"
import { SearchFormData } from "./types"

export default function MobileSearchBar() {
    const { loadFromUrl, submit } = useSearchForm()

    const form = useForm<SearchFormData>({
        defaultValues: loadFromUrl(),
    })
    const { getValues, register, reset } = form

    // POST form data and update query params
    function handleSubmit() {
        const data = getValues()
        submit(data)
        reset(data)
    }

    const [showFilters, setShowFilters] = useState(false)

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
            <SearchDialog
                open={showFilters}
                onClose={() => setShowFilters(false)}
            />
        </>
    )
}
