import { usePathname, useSearchParams } from "next/navigation"
import { parseAsInteger, useQueryState } from "nuqs"
import { MouseEvent } from "react"

type Event = MouseEvent<HTMLAnchorElement>

/**
 * Calcuate <a> props for a given cursor (eg href)
 */
export function usePageLink() {
    const [after, setAfter] = useQueryState("after", parseAsInteger)

    const pathname = usePathname()
    const search = useSearchParams()

    function getHref(cursor?: number | null): string {
        if (cursor === undefined) {
            return ""
        }

        const current =
            typeof window === "undefined"
                ? `https://_${pathname}?${search.toString()}`
                : window.location.href

        // Clear url fragment, it's page-specific
        const url = new URL(current)
        url.hash = ""

        url.searchParams.set("after", (cursor ?? "").toString())

        // Strip origin to prevent hydration errors
        const prefixPatt = new RegExp(`^${url.origin}`)
        return url.href.replace(prefixPatt, "")
    }

    function updateUrl(cursor?: number | null) {
        if (cursor === undefined) {
            return
        }

        // Update url and notify useHash (via popstate event)
        window.history.pushState(
            { ...window.history.state },
            "",
            getHref(cursor),
        )

        // Notify nuqs of the url change
        setAfter(cursor ?? null, { shallow: true, history: "replace" })
    }

    return {
        getLinkProps: (cursor?: number | null) => ({
            href: getHref(cursor),
            onClick: (ev: Event) =>
                hijackNavigation(ev, () => updateUrl(cursor)),
        }),
    }
}

/**
 * Prevent page reload if the user wants to open a link in the current tab
 *
 * And we're using this instead of nextjs <Link>s because those...
 *   cause a delay where nothing happens after click
 *     because nextjs is waiting on a rsc request without triggering any Suspense / spinners (components see it as a page reload)
 *     eg https://github.com/vercel/next.js/discussions/60412
 *        https://github.com/vercel/next.js/discussions/58357
 *        https://stackblitz.com/edit/stackblitz-starters-pgnz3c?file=app%2Fpaginator%2Fpaginator.tsx&view=editor
 *   and dont play nice with url fragments, basically breaking the back button
 *        https://github.com/47ng/nuqs/issues/498#issuecomment-1940468185
 *
 * @jank
 */
export function hijackNavigation(
    ev: MouseEvent<HTMLAnchorElement>,
    updateUrl: () => void,
): void {
    if (ev.ctrlKey) {
        return
    } else {
        ev.preventDefault()
        updateUrl()
    }
}
