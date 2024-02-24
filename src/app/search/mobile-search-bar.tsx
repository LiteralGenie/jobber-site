import { useForm } from "react-hook-form"
import { SEARCH_FORM_DEFAULT } from "./hooks/constants"
import { useSearchForm } from "./hooks/useSearchForm"
import Search from "./search"
import { SearchFormData } from "./types"

export default function MobileSearchBar() {
    const { loadFromUrl, submit } = useSearchForm()

    const form = useForm<SearchFormData>({
        defaultValues: loadFromUrl(),
    })
    const { getValues, reset } = form

    // POST form data and update query params
    function handleSubmit() {
        const data = getValues()
        submit(data)
        reset(data)
    }

    function handleReset() {
        reset()
    }

    function handleClear() {
        reset(SEARCH_FORM_DEFAULT(), { keepDefaultValues: true })
    }

    return (
        <Search
            form={form}
            onSubmit={handleSubmit}
            onReset={handleReset}
            onClear={handleClear}
        />
    )
}
