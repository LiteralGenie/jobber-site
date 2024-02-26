import { useSearchParams } from "next/navigation"
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"

export interface HashContextValue {
    hash: string | null
    recheckHash: () => void
}

const HashContext = createContext<HashContextValue | null>(null)

export function useHashContext(): HashContextValue {
    const ctx = useContext(HashContext)
    if (ctx === null) {
        throw new Error("No provider for HashContext")
    }

    return ctx
}

export interface HashProviderProps {
    children: ReactNode
}

export function HashProvider({ children }: HashProviderProps) {
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

    useEffect(() => {
        if (!isClient) {
            return
        }

        // Update hash on `window.location.hash = ...`
        window.addEventListener("hashchange", recheckHash)

        // Update hash on back-button / window.location.pushState()
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

    const value = {
        hash,

        // hash can be changed via window.location.replaceState()
        // but this doesn't trigger any events so provide this as an escape hatch
        // (which is also why this is a provider (global value) and not a regular hook)
        recheckHash,
    }

    return <HashContext.Provider value={value}>{children}</HashContext.Provider>
}

function getHash(): string | null {
    return typeof window !== "undefined"
        ? decodeURIComponent(window.location.hash.replace("#", ""))
        : null
}
