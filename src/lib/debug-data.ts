import { JobData } from "./job-data"

export const DEBUG_DATA: JobData[] = [
    {
        id: "1",

        clearance: false,
        company: "company",
        description: "description",
        time_created: "2023-12-05T15:31:28+0000",
        title: "job_1",

        location: null,
        salary: null,

        duties: [],
        skills: [],
    },
    {
        id: "2",

        clearance: false,
        company: "company",
        description: "description",
        time_created: "2023-12-01T11:01:32+0000",
        title: "job_2",

        location: 'remote',
        salary: {
            min: 70000,
            max: 90000,
        },

        duties: [],
        skills: ['Python']
    },
    {
        id: "3",

        clearance: false,
        company: "company",
        description: "description",
        time_created: "2022-01-23T16:15:54+0000",
        title: "job_3",

        location: 'on-site',
        salary: {
            min: 50000,
            max: 150000,
        },

        duties: [],
        skills: ['TypeScript', 'Rust']
    },
]
