import { Link } from "@mui/material"
import { ReactNode } from "react"

function link(
    text: string,
    href: string,
    { prefix = true, suffix = true } = {}
) {
    return (
        <>
            {prefix ? " " : ""}
            <Link href={href}>{text}</Link>
            {suffix ? " " : ""}
        </>
    )
}

interface Question {
    id: string
    question: string
    answer: ReactNode
}

export const QUESTIONS = [
    {
        id: "why",
        question: "Why build yet another job board?",
        answer: (
            <>
                Mostly to learn React stuff. {link("MUI", "https://mui.com/")}{" "}
                (and also{" "}
                {link("Kysely", "https://kysely.dev/", { suffix: false })}) has
                been an absolute joy to use!
            </>
        ),
    },
    {
        id: "what",
        question: "What tech stack is Jobber using?",
        answer: (
            <>
                For the website: {link("React", "https://react.dev/")} +
                {link("Next.js", "https://nextjs.org/")} +
                {link("MUI", "https://mui.com/")} +
                {link("Tailwind CSS", "https://tailwindcss.com/")}
                <br />
                For the database: {link(
                    "SQLite",
                    "https://www.sqlite.org/"
                )} + {link("Kysely", "https://kysely.dev/")}
                <br />
                For labeling data:
                {link(
                    "Mistral 7B",
                    "https://mistral.ai/news/announcing-mistral-7b/"
                )}
                + {link("guidance", "https://github.com/guidance-ai/guidance")}
            </>
        ),
    },
    {
        id: "where",
        question: "Where are the jobs from?",
        answer: (
            <>
                The job description and title are from
                {link("Indeed", "https://www.indeed.com/")}
                <br />
                The labels (eg required skills) are inferred from the
                description.
            </>
        ),
    },
    {
        id: "accuracy",
        question: "How accurate are the labels / filters?",
        answer: (
            <>
                A mixed bag. I haven't made any benchmarks yet, but from
                observation...
                <ul className="mt-0">
                    <li>Clearance is mostly accurate.</li>
                    <li>
                        Locations tend to have false positives for famous
                        companies.
                    </li>
                    <li>
                        Salary tends to be accurate, except when an hourly pay
                        is listed.
                    </li>
                    <li>
                        Required skills tend to be accurate, or prone to false
                        positives, depending on your interpretation of
                        "required".
                    </li>
                    <li>For responsibilities, not sure.</li>
                </ul>
            </>
        ),
    },
    {
        id: "counts",
        question: "What are the numbers next to some of the filter options?",
        answer: (
            <>
                A filter option like "Python (42)" means that there are 42
                recent jobs tagged with the Python requirement.
                <br />
                Where "recent" currently means jobs from the last 14 days.
            </>
        ),
    },
    {
        id: "contact",
        question: "Feedback? Questions? Concerns?",
        answer: (
            <>
                Feel free to open an
                {link(
                    "issue",
                    "https://github.com/LiteralGenie/jobber-site/issues"
                )}
                or
                {link(
                    "discussion",
                    "https://github.com/LiteralGenie/jobber-site/discussions"
                )}
                on Github.
                <br />
                Or drop me a line at
                {link("mailto:velchees@gmail.com", "mailto:velchees@gmail.com")}
            </>
        ),
    },
] as const satisfies Question[]
