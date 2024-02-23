import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

function getHash(): string | null {
    return typeof window !== "undefined"
        ? decodeURIComponent(window.location.hash.replace("#", ""))
        : null
}

export function useHash() {
    // @jank:
    // hash will be null during ssr + hydration (ie first render)
    // It's technically available during hydration but using it will cause nextjs errors
    //   https://github.com/vercel/next.js/discussions/49465#discussioncomment-7034208
    const [hash, setHash] = useState<string | null>(null)

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
        window.addEventListener("popstate", handleHashChange)

        return () => {
            window.removeEventListener("hashchange", handleHashChange)
            window.addEventListener("popstate", handleHashChange)
        }
    }, [isClient])

    // Update hash when router wipes it out
    // (which doesn't trigger hashchange events)
    const params = useSearchParams()
    useEffect(() => {
        setHash(getHash())
    }, [params])

    return {
        hash,
    }
}
