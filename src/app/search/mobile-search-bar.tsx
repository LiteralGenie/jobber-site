import { useForm } from "react-hook-form"
import { DutyDto } from "../api/duties/handler"
import { LocationDto } from "../api/locations/handler"
import { SkillDto } from "../api/skills/handler"
import { SEARCH_FORM_DEFAULT } from "./hooks/constants"
import { useSearchForm } from "./hooks/useSearchForm"
import Search from "./search"
import { SearchFormData } from "./types"

export interface SearchProps {
    duties: DutyDto[]
    skills: SkillDto[]
    locations: LocationDto[]
}

export default function MobileSearchBar({
    duties,
    skills,
    locations,
}: SearchProps) {
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
            duties={duties}
            skills={skills}
            locations={locations}
            form={form}
            onSubmit={handleSubmit}
            onReset={handleReset}
            onClear={handleClear}
        />
    )
}
