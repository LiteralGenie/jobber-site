import { Typography, alpha, useTheme } from "@mui/material"
import styles from "./table-of-contents.module.scss"
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
    const { activeSectionId, setOverride } = useActiveSection()

    const isActive = activeSectionId === id

    const theme = useTheme()
    const defaultColor = alpha(theme.palette.text.primary, 0.6)
    const activeColor = alpha(theme.palette.text.primary, 0.8)

    return (
        <Typography variant="body2" display="block" color={activeColor}>
            <a
                onClick={() => setOverride(id)}
                className={styles.link}
                style={{
                    color: isActive ? activeColor : defaultColor,
                    borderColor: isActive ? activeColor : "transparent",
                }}
                href={`#${id}`}
            >
                {question}
            </a>
        </Typography>
    )
}
