"use-client"

import { Button, Divider, Paper, TextField } from "@mui/material"
import { UseFormReturn } from "react-hook-form"
import { DutyDto } from "../api/duties/handler"
import { LocationDto } from "../api/locations/handler"
import { SkillDto } from "../api/skills/handler"
import { ClearanceFilter } from "./clearance-filter"
import { DutyFilter } from "./duty-filter"
import { LocationFilter } from "./location-filter"
import { LocationTypeFilter } from "./location-type-filter"
import styles from "./search.module.scss"
import { SkillFilter } from "./skill-filter"
import { SearchFormData } from "./types"
import { YoeFilter } from "./yoe-filter"

export interface SearchProps {
    duties: DutyDto[]
    skills: SkillDto[]
    locations: LocationDto[]
    form: UseFormReturn<SearchFormData>
    onSubmit: () => void
    onReset: () => void
    onClear: () => void
}

export default function Search({
    duties,
    skills,
    locations,
    form,
    onSubmit,
    onReset,
    onClear,
}: SearchProps) {
    const { register, formState } = form

    return (
        <form
            onSubmit={(ev) => {
                ev.preventDefault()
                onSubmit()
            }}
            className={styles["search-form"]}
        >
            <Paper
                variant="outlined"
                className="overflow-auto flex flex-col p-2"
            >
                {/* Text filter */}
                <div className="px-2">
                    <TextField
                        label="Text"
                        variant="standard"
                        type="text"
                        placeholder="software (developer|engineer)"
                        {...register("text")}
                    />
                </div>

                <div className="pb-2 pt-4">
                    <LocationFilter form={form} locations={locations} />
                </div>

                <div className="pb-2 pt-4">
                    <Divider />
                </div>

                {/* Experience filter */}
                <div className="px-2">
                    <YoeFilter form={form} />
                </div>

                <div className="pb-2">
                    <Divider />
                </div>

                {/* Skill / duty filters */}
                <div className="px-2">
                    <SkillFilter skills={skills} form={form} />
                </div>

                <div className="pb-2 pt-4">
                    <Divider />
                </div>

                <div className="px-2">
                    <DutyFilter duties={duties} form={form} />
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
                        <LocationTypeFilter form={form} />
                        <ClearanceFilter form={form} />
                    </div>
                </section>
            </Paper>

            <div className="pt-4 flex justify-end gap-2">
                <Button
                    variant="outlined"
                    onClick={onClear}
                    aria-label="Clear filters"
                    title="Clear filters"
                >
                    Clear
                </Button>
                <Button
                    variant="outlined"
                    onClick={onReset}
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
