import { SEARCH_FORM_DEFAULT } from "@/app/search/hooks/constants"
import { useSearchForm } from "@/app/search/hooks/useSearchForm"
import { SearchFormData } from "@/app/search/types"
import { ReactNode, createContext, useContext } from "react"
import { UseFormReturn, useForm } from "react-hook-form"

export interface FormContextValue {
    form: UseFormReturn<SearchFormData, any, undefined>
    handleSubmit: () => void
    handleReset: () => void
    handleClear: () => void
}

const FormContext = createContext<FormContextValue | null>(null)

export function useFormContext(): FormContextValue {
    const ctx = useContext(FormContext)
    if (ctx === null) {
        throw new Error("No provider for FormContext")
    }

    return ctx
}

export interface FormProviderProps {
    children: ReactNode
}

export function FormProvider({ children }: FormProviderProps) {
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

    const value = {
        form,
        handleSubmit,
        handleReset,
        handleClear,
    }

    return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}
