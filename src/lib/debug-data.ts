import { JobData } from "./job-data"

export const DEBUG_DATA: JobData[] = [
    {
        id: "1",

        clearance: false,
        company: "company",
        description: "description",
        time_updated: "2023-12-05T15:31:28+0000",
        title: "job_1",

        location: null,
        salary: null,

        responsibilities: [],
        skills: {},
    },
    {
        id: "2",

        clearance: false,
        company: "company",
        description: "description",
        time_updated: "2023-12-01T11:01:32+0000",
        title: "job_2",

        location: 'remote',
        salary: {
            min: 70000,
            max: 90000,
        },

        responsibilities: [],
        skills: {
            "Python": 0
        },
    },
    {
        id: "3",

        clearance: false,
        company: "company",
        description: "description",
        time_updated: "2022-01-23T16:15:54+0000",
        title: "job_3",

        location: 'on-site',
        salary: {
            min: 50000,
            max: 150000,
        },

        responsibilities: [],
        skills: {
            "TypeScript": 0,
            "Rust": 3,
        },
    },
]
