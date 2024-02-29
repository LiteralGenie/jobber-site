import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer"
import { Typography } from "@mui/material"
import { MutableRefObject, ReactNode, useEffect, useRef } from "react"
import { useActiveSection } from "./use-active-section-context"

export interface SectionProps {
    id: string
    question: string
    answer: ReactNode
    containerRef: MutableRefObject<Element | null>
}

export function Section({ id, question, answer, containerRef }: SectionProps) {
    const { markSection, deleteSection } = useActiveSection()
    const ref = useRef<HTMLDivElement | null>(null)

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
        <div id={id} ref={ref} className="h-full">
            <Typography variant="h5" className="pb-1">
                {question}
            </Typography>
            {answer}
        </div>
    )
}
