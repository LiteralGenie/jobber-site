import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

function getHash(): string {
    return typeof window !== "undefined"
        ? decodeURIComponent(window.location.hash.replace("#", ""))
        : ""
}

export function useHash() {
    const [hash, setHash] = useState(getHash())

    // @jank: Hack to fix hydration errors (forces first client render to match the server stuff)
    //        https://github.com/vercel/next.js/discussions/49465#discussioncomment-7034208
    //        Why does nextjs make reading anything url related so hard...
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Update hash on `window.location.hash = ...` calls
    useEffect(() => {
        if (!isClient) {
            return
        }

        const handleHashChange = () => {
            setHash(getHash())
        }
        window.addEventListener("hashchange", handleHashChange)
        return () => {
            window.removeEventListener("hashchange", handleHashChange)
        }
    }, [isClient])

    // Update hash when router wipes it out
    // (which doesn't trigger hashchange events)
    const params = useSearchParams()
    useEffect(() => {
        setHash(getHash())
    }, [params])

    return {
        hash: isClient ? hash : "",
        isHashAvailable: isClient,
    }
}
