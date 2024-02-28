import { db } from "@/database/db"
import { create } from "xmlbuilder2"

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

    const items = (await selectRecent()).map(
        ({ id, rowid, title, text, time_created }) => ({
            title: title,
            link: `https://jobber.velchees.dev/?after=${rowid}#${id}`,
            description: clean(text),
            guid: id,
            pubDate: new Date(time_created * 1000).toUTCString(),
        })
    )

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
async function selectRecent() {
    const now = new Date().getTime()
    const start = (now - MAX_AGE) / 1000

    return await db
        // Filter for fully-labeled posts
        .with("with_labels", (eb) =>
            eb
                .selectFrom("indeed_posts as post")
                .innerJoin(
                    "indeed_label_statuses as status",
                    "status.id_post",
                    "post.id"
                )
                .where("status.has_skills", "=", 1)
                .where("status.has_duties", "=", 1)
                .where("status.has_locations", "=", 1)
                .where("status.has_misc", "=", 1)
                .where("status.has_yoe", "=", 1)
                .select([
                    "post.rowid",
                    "post.id",
                    "post.title",
                    "post.text",
                    "post.time_created",
                ])
        )
        .selectFrom("with_labels")
        .where("time_created", ">=", start)
        .select(["id", "rowid", "title", "text", "time_created"])
        .orderBy("rowid", "desc")
        .execute()
}

// Purge anything that'll treated as an xml escape character (eg &nbsp;)
function clean(s: string) {
    return s
        .replaceAll(/&nbsp;/g, "\n")
        .replaceAll(/&[^\s]+;/g, "&#038;")
        .replaceAll("\n", "&lt;br&gt;")
}
