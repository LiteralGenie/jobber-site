import { useRef } from "react"
import { QUESTIONS } from "./questions"
import { Section } from "./section"
import { TableOfContents } from "./table-of-contents"
import { ActiveSectionProvider } from "./use-active-section-context"

const qs = QUESTIONS

export function Faq() {
    const containerRef = useRef<HTMLDivElement | null>(null)

    return (
        <ActiveSectionProvider orderedIds={qs.map(({ id }) => id)}>
            <div
                ref={containerRef}
                className="h-full overflow-auto flex justify-center gap-8 lg:gap-24"
            >
                <div className="h-max max-w-3xl px-8 pt-8 pb-72 md:pr-0 flex flex-col gap-16">
                    {qs.map(({ id, question, answer }) => (
                        <Section
                            key={id}
                            id={id}
                            question={question}
                            answer={answer}
                            containerRef={containerRef}
                        />
                    ))}
                </div>

                <div className="min-w-max hidden md:block sticky top-0 pt-8 pr-12 h-min">
                    <TableOfContents sections={qs} />
                </div>
            </div>
        </ActiveSectionProvider>
    )
}
