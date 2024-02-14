import { Generated, Selectable } from "kysely"

export type SqliteBool = 1 | 0

export interface Database {
    duties: DutiesTable
    skills: SkillsTable

    indeed_posts: IndeedPostsTable
    indeed_skill_labels: IndeedSkillLabelsTable
    indeed_duty_labels: IndeedDutyLabelsTable
    indeed_misc_labels: IndeedMiscLabelsTable
}

export interface DutiesTable {
    id: Generated<number>

    name: string
}

export interface SkillsTable {
    id: Generated<number>

    name: string
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

export type Skill = Selectable<SkillsTable>
export type Duty = Selectable<DutiesTable>
export type IndeedPost = Selectable<IndeedPostsTable>
export type IndeedSkillLabel = Selectable<IndeedSkillLabelsTable>
export type IndeedDutyLabel = Selectable<IndeedDutyLabelsTable>
