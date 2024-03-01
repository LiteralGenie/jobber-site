import { Generated } from "kysely"

export type SqliteBool = 1 | 0

export interface Database {
    duties: DutiesTable
    skills: SkillsTable
    locations: LocationsTable

    posts: PostsTable
    label_statuses: LabelStatusesTable
    skill_labels: SkillLabelsTable
    duty_labels: DutyLabelsTable
    misc_labels: MiscLabelsTable
    location_labels: LocationLabelsTable
    yoe_labels: YoeLabelsTable
}

export interface DutiesTable {
    id: Generated<number>

    name: string
}

export interface SkillsTable {
    id: Generated<number>

    name: string
}

export interface LocationsTable {
    id: number

    country: string
    state: string
    city: string
}

export interface PostsTable {
    id: Generated<number>

    company: string
    text: string
    title: string

    source: string
    url: string

    time_created: number
}

export interface SkillLabelsTable {
    id_skill: number
    id_post: number

    label: SqliteBool
}

export interface DutyLabelsTable {
    id_duty: number
    id_post: number

    label: SqliteBool
}

export interface MiscLabelsTable {
    id_post: number

    is_hybrid: SqliteBool
    is_onsite: SqliteBool
    is_remote: SqliteBool
    salary: number | null
    clearance: SqliteBool
}

export interface LabelStatusesTable {
    id_post: number

    has_skills: SqliteBool
    has_duties: SqliteBool
    has_misc: SqliteBool
    has_locations: SqliteBool
    has_yoe: SqliteBool
}

export interface LocationLabelsTable {
    id_post: number
    id_location: number
}

export interface YoeLabelsTable {
    id_post: number

    yoe: number | null
}
