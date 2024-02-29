import { Link, LinkProps } from "@mui/material"
import { ReactNode } from "react"

function link(text: string, href: string, props?: LinkProps) {
    return (
        <>
            {" "}
            <Link {...props}>{text}</Link>{" "}
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
        id: "why",
        question: "Why build yet another job board?",
        answer: (
            <>
                I wanted a job board with more specific filters (especially
                "exclude-this" filters).
                <br />
                Also to learn me a React.
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
                <br />
                For gathering data: {link("Crawlee", "https://playwright.dev/")}
                + {link("Playwright", "https://playwright.dev/")}
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
