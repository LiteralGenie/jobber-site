import {
    humanizeClearance,
    humanizeExperience,
    humanizeLocation,
    humanizeLocationType,
    humanizeSalary,
} from "@/lib/format-utils"
import { JobData } from "@/lib/job-data"
import { create } from "xmlbuilder2"
import { getJobs } from "../api/jobs/handler"

const ONE_DAY = 24 * 60 * 60 * 1000
const MAX_AGE = 3 * ONE_DAY

export async function GET() {
    const channel = {
        title: "Jobber",
        link: "https://jobber.velchees.dev",
        description: "Just a job board",
        webmaster: "velchees@gmail.com",
        lastBuildDate: new Date().toUTCString(),

        // "For people who might stumble across an RSS file on a Web server 25 years from now and wonder what it is."
        docs: "https://www.rssboard.org/rss-specification",
    }

    const items = await getItems()

    const xml = create({
        rss: {
            "@version": "2.0",
            channel: {
                ...channel,

                item: items,
            },
        },
    }).end({ prettyPrint: true })

    return new Response(xml, {
        status: 200,
        headers: new Headers({
            "content-type": "application/xml",
        }),
    })
}

// Get recent jobs, ordered by newest-first
async function getItems() {
    const now = new Date().getTime()
    const start = (now - MAX_AGE) / 1000
    const { jobs } = await getJobs({ startTime: start, limit: 9999 })

    return jobs.map((j) => ({
        title: j.title,
        link: `https://jobber.velchees.dev/?after=${j.rowid}#${j.id}`,
        description: formatDescription(j),
        guid: j.id,
        pubDate: new Date(j.time_created).toUTCString(),
    }))
}

function clean(s: string) {
    return (
        s
            // Unescape html entities
            .replaceAll(/&nbsp;/g, " ")
            // Purge anything that'll treated as an xml escape character
            .replaceAll(/&[^\s]+;/g, "&#038;")
            // Convert new lines to <br>s
            .replaceAll("\n", "<br>")
    )
}

function wrap(tag: string, content: string) {
    const open = `<${tag}>`
    const close = `</${tag}>`
    return open + content + close
}

// Add highlights to top of job description (like the webpage does in details pane)
function formatDescription(j: JobData): string {
    const toTitle = (text: string) => wrap("b", text)
    const indent = "- "

    const parts = []

    // Title / company
    parts.push(`${j.title}\n${j.company}`)

    // Salary / clearance / yoe
    const salary = `${toTitle("Salary")}: ${humanizeSalary(j.salary)}`
    const clearance = `${toTitle("Clearance required")}: ${humanizeClearance(
        j.clearance
    )}`
    const yoe = `${toTitle("Minimum experience")}: ${humanizeExperience(j.yoe)}`
    parts.push(`${salary}\n${clearance}\n${yoe}`)

    // Locations
    const locTypes = `${toTitle("Location Type")}: ${humanizeLocationType(
        j.location_type
    )}`
    if (j.locations.length) {
        const locs = j.locations
            .map((loc) => humanizeLocation(loc))
            .map((loc) => indent + loc)
        const locsString = `${toTitle("Locations")}:\n` + locs.join("\n")
        parts.push(`${locTypes}\n${locsString}`)
    } else {
        parts.push(locTypes)
    }

    // Skills
    if (j.skills.length) {
        const skills = j.skills.map(({ name }) => indent + name).join("\n")
        parts.push(`${toTitle("Requirements")}:\n` + skills)
    }

    // Duties
    if (j.duties.length) {
        const duties = j.duties.map(({ name }) => indent + name).join("\n")
        parts.push(`${toTitle("Responsibilities")}:\n` + duties)
    }

    // Description
    parts.push(toTitle("Description") + ":\n" + j.description)

    const result = parts.join("\n\n---\n\n")
    return clean(result)
}
