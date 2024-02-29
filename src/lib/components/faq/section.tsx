import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer"
import { Link, Typography, useTheme } from "@mui/material"
import { MutableRefObject, ReactNode, useEffect, useRef } from "react"
import { useActiveSection } from "./use-active-section-context"

export interface SectionProps {
    id: string
    question: string
    answer: ReactNode
    containerRef: MutableRefObject<Element | null>
}

export function Section({ id, question, answer, containerRef }: SectionProps) {
    const { markSection, deleteSection, setOverride } = useActiveSection()
    const ref = useRef<HTMLDivElement | null>(null)

    const theme = useTheme()

    useIntersectionObserver({
        root: containerRef,
        target: ref,
        onEnter: () => markSection(id, true),
        onExit: () => markSection(id, false),
    })

    useEffect(() => {
        return () => deleteSection(id)
    }, [])

    return (
        <div
            id={id}
            ref={ref}
            className="h-full"
            onClick={() => setOverride(id)}
        >
            <Link
                href={`#${id}`}
                className="no-underline hover:underline"
                color={theme.palette.text.primary}
                sx={{
                    "&:hover .hash": {
                        opacity: "1 !important",
                    },
                }}
            >
                <Typography variant="h5" className="pb-1 relative">
                    <span className="hash opacity-0 text-center absolute left-[-1.25rem]">
                        #
                    </span>

                    {question}
                </Typography>
            </Link>

            {answer}
        </div>
    )
}
