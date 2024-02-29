import { useActiveSection } from "./use-active-section-context"

type Section = {
    id: string
    name: string
}

export interface TableOfContentsProps {
    sections: Section[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
    return sections.map(({ id, name }) => (
        <Header key={id} id={id} name={name} />
    ))
}

export interface HeaderProps {
    id: string
    name: string
}

export function Header({ id, name }: HeaderProps) {
    const { activeSectionId } = useActiveSection()

    const isActive = activeSectionId === id

    return (
        <div>
            {name} {String(isActive)}
        </div>
    )
}
