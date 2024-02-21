import { Generated } from "kysely"

export type SqliteBool = 1 | 0

export interface Database {
    duties: DutiesTable
    skills: SkillsTable
    locations: LocationsTable

    indeed_posts: IndeedPostsTable
    indeed_label_statuses: IndeedLabelStatusesTable
    indeed_skill_labels: IndeedSkillLabelsTable
    indeed_duty_labels: IndeedDutyLabelsTable
    indeed_misc_labels: IndeedMiscLabelsTable
    indeed_location_labels: IndeedLocationLabelsTable
    indeed_yoe_labels: IndeedYoeLabelsTable
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

export interface IndeedPostsTable {
    rowid: number
    id: string

    company: string
    text: string
    title: string

    details_html: string
    preview_html: string
    time_created: number
}

export interface IndeedSkillLabelsTable {
    id_skill: number
    id_post: string

    label: SqliteBool
}

export interface IndeedDutyLabelsTable {
    id_duty: number
    id_post: string

    label: SqliteBool
}

export interface IndeedMiscLabelsTable {
    id_post: string

    is_hybrid: SqliteBool
    is_onsite: SqliteBool
    is_remote: SqliteBool
    salary: number
    clearance: SqliteBool
}

export interface IndeedLabelStatusesTable {
    id_post: string

    has_skills: SqliteBool
    has_duties: SqliteBool
    has_misc: SqliteBool
    has_locations: SqliteBool
    has_yoe: SqliteBool
}

export interface IndeedLocationLabelsTable {
    id_post: string
    id_location: number
}

export interface IndeedYoeLabelsTable {
    id_post: string

    yoe: number | null
}
