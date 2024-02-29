import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer"
import { MutableRefObject, ReactNode, useEffect, useRef } from "react"
import { useActiveSection } from "./use-active-section-context"

export interface SectionProps {
    id: string
    question: string
    answer: ReactNode
    containerRef: MutableRefObject<Element | null>
}

export function Section({ id, question, answer, containerRef }: SectionProps) {
    const { activeSectionId, markSection, deleteSection } = useActiveSection()
    const ref = useRef<HTMLDivElement | null>(null)

    const isActive = activeSectionId === id

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
        <div ref={ref} className="h-full">
            <div>{question}</div>
            {answer}
        </div>
    )
}
