import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function useQueryParams() {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = new URLSearchParams(useSearchParams().toString())

    return {
        set: (params: URLSearchParams) => router.push(`${pathName}?${params}`),
        get: () => new URLSearchParams(searchParams.toString()),
    }
}
