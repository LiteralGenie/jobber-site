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

    function recheckHash() {
        setHash(getHash())
    }

    // Update hash on `window.location.hash = ...` calls
    useEffect(() => {
        if (!isClient) {
            return
        }

        window.addEventListener("hashchange", recheckHash)
        window.addEventListener("popstate", recheckHash)

        return () => {
            window.removeEventListener("hashchange", recheckHash)
            window.addEventListener("popstate", recheckHash)
        }
    }, [isClient])

    // Update hash when router wipes it out
    // (which doesn't trigger hashchange events)
    const params = useSearchParams()
    useEffect(() => recheckHash(), [params])

    return {
        hash,
    }
}
