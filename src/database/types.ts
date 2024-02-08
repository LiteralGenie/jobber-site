import { Generated, Selectable } from "kysely"

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

    label: boolean
}

export interface IndeedDutyLabelsTable {
    id_duty: number
    id_post: string

    label: boolean
}

export interface IndeedMiscLabelsTable {
    id_post: string

    is_hybrid: boolean
    is_onsite: boolean
    is_remote: boolean
    salary: number
    clearance: boolean
}

export type Skill = Selectable<SkillsTable>
export type Duty = Selectable<DutiesTable>
export type IndeedPost = Selectable<IndeedPostsTable>
export type IndeedSkillLabel = Selectable<IndeedSkillLabelsTable>
export type IndeedDutyLabel = Selectable<IndeedDutyLabelsTable>
