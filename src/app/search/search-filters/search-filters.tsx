import { useDutyDto, useLocationDto, useSkillDto } from "@/lib/hooks/api"
import { useFormContext } from "@/lib/providers/form-provider"
import { Divider, TextField } from "@mui/material"
import { ClearanceFilter } from "./clearance-filter"
import { DutyFilter } from "./duty-filter"
import { LocationFilter } from "./location-filter"
import { LocationTypeFilter } from "./location-type-filter"
import { SkillFilter } from "./skill-filter"
import { YoeFilter } from "./yoe-filter"

export function SearchFilters() {
    const {
        form: { register },
    } = useFormContext()

    const { data: duties } = useDutyDto()
    const { data: skills } = useSkillDto()
    const { data: locations } = useLocationDto()

    return (
        <>
            {/* Text filter */}
            <div className="px-2 pt-2">
                <TextField
                    label="Text"
                    variant="standard"
                    type="text"
                    placeholder="software (dev|eng).*"
                    {...register("text")}
                />
            </div>

            <div className="pb-2 pt-4">
                <LocationFilter locations={locations ?? []} />
            </div>

            <div className="pb-2 pt-4">
                <Divider />
            </div>

            {/* Experience filter */}
            <div className="px-2">
                <YoeFilter />
            </div>

            <div className="pb-2">
                <Divider />
            </div>

            {/* Skill / duty filters */}
            <div className="px-2">
                <SkillFilter skills={skills ?? []} />
            </div>

            <div className="pb-2 pt-4">
                <Divider />
            </div>

            <div className="px-2">
                <DutyFilter duties={duties ?? []} />
            </div>

            <div className="pb-2 pt-4">
                <Divider />
            </div>

            {/* Miscellaenous */}
            <section className="flex flex-col px-2">
                <div className="flex flex-col gap-4">
                    <TextField
                        label="Salary"
                        variant="standard"
                        type="number"
                        {...register("salary")}
                    />
                    <LocationTypeFilter />
                    <ClearanceFilter />
                </div>
            </section>
        </>
    )
}
