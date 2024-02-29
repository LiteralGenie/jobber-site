import { Typography } from "@mui/material"
import { useActiveSection } from "./use-active-section-context"

type Section = {
    id: string
    question: string
}

export interface TableOfContentsProps {
    sections: Section[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
    return sections.map(({ id, question }) => (
        <Header key={id} id={id} question={question} />
    ))
}

export interface HeaderProps {
    id: string
    question: string
}

export function Header({ id, question }: HeaderProps) {
    const { activeSectionId } = useActiveSection()

    const isActive = activeSectionId === id

    return (
        <Typography variant="body2" display="block">
            {question}
        </Typography>
    )
}
