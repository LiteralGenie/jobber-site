import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer"
import { MutableRefObject, useEffect, useRef } from "react"
import { useActiveSection } from "./use-active-section-context"

export interface SectionProps {
    id: string
    question: string
    answer: string
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
        <div ref={ref} className="h-80">
            <p>{question}</p>
            <p>{answer}</p>
            <p>
                {id} {String(isActive)}
            </p>
        </div>
    )
}
