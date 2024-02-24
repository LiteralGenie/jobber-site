import { DutyDto } from "@/app/api/duties/handler"
import { LocationDto } from "@/app/api/locations/handler"
import { SkillDto } from "@/app/api/skills/handler"
import { useQuery } from "@tanstack/react-query"

async function doApiFetch<T>(path: string): Promise<T> {
    const resp = await fetch(path)
    const data = (await resp.json()) as T
    return data
}

export function useDutyDto() {
    return useQuery({
        queryKey: ["/api/duties"],
        queryFn: () => doApiFetch<DutyDto[]>("/api/duties"),
    })
}

export function useSkillDto() {
    return useQuery({
        queryKey: ["/api/skills"],
        queryFn: () => doApiFetch<SkillDto[]>("/api/skills"),
    })
}

export function useLocationDto() {
    return useQuery({
        queryKey: ["/api/locations"],
        queryFn: () => doApiFetch<LocationDto[]>("/api/locations"),
    })
}
