import { useFormContext } from "@/lib/providers/form-provider"
import { Button, Dialog, Paper } from "@mui/material"
import { SearchFilters } from "./search-filters/search-filters"

export interface SearchDialogProps {
    open: boolean
    onClose: () => void
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
    const {
        form: { formState },
        handleSubmit,
        handleReset,
        handleClear,
    } = useFormContext()

    return (
        <Dialog open={open} onClose={onClose}>
            <form
                onSubmit={(ev) => {
                    ev.preventDefault()
                    handleSubmit()
                }}
                className="min-h-0 flex flex-col"
            >
                <Paper
                    variant="outlined"
                    className="overflow-auto flex flex-col p-4"
                >
                    <SearchFilters />
                </Paper>

                <Paper className="p-2 flex justify-end gap-2">
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
                </Paper>
            </form>
        </Dialog>
    )
}
