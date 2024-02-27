import { RefObject, useEffect, useState } from "react"

export function useScrollTop(scrollElRef: RefObject<HTMLDivElement>) {
    const [scrollTop, setScrollTop] = useState(0)

    useEffect(() => {
        const el = scrollElRef.current
        if (!el) {
            return () => {}
        }

        const onScroll = () => {
            setScrollTop(el.scrollTop)
        }

        el.addEventListener("scroll", onScroll)

        return () => el.removeEventListener("scroll", onScroll)
    }, [scrollElRef])

    return { scrollTop }
}
