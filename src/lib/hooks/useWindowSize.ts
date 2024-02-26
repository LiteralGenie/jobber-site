import { useEffect, useState } from "react"

export interface WindowSize {
    height: number
    width: number
}

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize | null>(null)

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                height: window.innerHeight,
                width: window.innerWidth,
            })
        }

        // Init on page load
        handleResize()

        // Listen for changes
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])
    return { windowSize }
}
