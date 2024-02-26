import { useFormContext } from "@/lib/providers/form-provider"
import { Button, Paper } from "@mui/material"
import { SearchFilters } from "./search-filters/search-filters"

export interface SearchProps {
    className?: string
}

export default function Search({ className }: SearchProps) {
    const {
        form: { formState },
        handleSubmit,
        handleReset,
        handleClear,
    } = useFormContext()

    return (
        <form
            onSubmit={(ev) => {
                ev.preventDefault()
                handleSubmit()
            }}
            className={`min-h-0 flex flex-col ${className ?? ""}`}
        >
            <Paper
                variant="outlined"
                className="overflow-auto flex flex-col p-2"
            >
                <SearchFilters />
            </Paper>

            <div className="pt-4 flex justify-end gap-2">
                <Button
                    variant="outlined"
                    onClick={handleClear}
                    aria-label="Clear filters"
                    title="Clear filters"
                >
                    Clear
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleReset}
                    aria-label="Reset changes"
                    title="Reset changes"
                >
                    Reset
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    aria-label="Submit"
                    title="Apply filters"
                    disabled={!formState.isDirty}
                >
                    Submit
                </Button>
            </div>
        </form>
    )
}
