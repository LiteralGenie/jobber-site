import { MutableRefObject, useState } from "react"

type Ref = MutableRefObject<HTMLDivElement | null>

export interface UseActiveLayoutProps {
    refs: Ref[]
    defaultLayout: Ref
}

// Select the first ref that isn't set to display: none
export function useActiveLayout({ refs, defaultLayout }: UseActiveLayoutProps) {
    const [activeLayout, setActiveLayout] = useState(defaultLayout)

    function recheckLayout() {
        const firstVisible = refs.find(({ current }) => {
            if (!current) {
                return false
            }

            return isVisible(current)
        })

        return setActiveLayout(firstVisible ?? defaultLayout)
    }

    return { activeLayout, recheckLayout }
}

function isVisible(el: HTMLElement): boolean {
    const displayStyle = getComputedStyle(el).display
    return displayStyle !== "none"
}
