import { useRef } from "react"
import { TopBar } from "../home/top-bar/top-bar"
import { Section } from "./section"
import { TableOfContents } from "./table-of-contents"
import { ActiveSectionProvider } from "./use-active-section-context"

export function Faq() {
    const containerRef = useRef<HTMLDivElement | null>(null)

    const qas = [
        { id: "1", name: "1", question: "1?", answer: "1!" },
        { id: "2", name: "2", question: "2?", answer: "2!" },
        { id: "3", name: "3", question: "3?", answer: "3!" },
        { id: "4", name: "4", question: "4?", answer: "4!" },
        { id: "5", name: "5", question: "5?", answer: "5!" },
        { id: "6", name: "6", question: "6?", answer: "6!" },
    ]

    return (
        <div className="h-full">
            <TopBar />

            <ActiveSectionProvider orderedIds={qas.map(({ id }) => id)}>
                <div className="h-full relative">
                    <div className="absolute top-8 right-12">
                        <TableOfContents sections={qas} />
                    </div>

                    <div ref={containerRef} className="h-full overflow-auto">
                        {qas.map(({ id, question, answer }) => (
                            <Section
                                key={id}
                                id={id}
                                question={question}
                                answer={answer}
                                containerRef={containerRef}
                            />
                        ))}
                    </div>
                </div>
            </ActiveSectionProvider>
        </div>
    )
}
