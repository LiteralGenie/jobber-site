import { MutableRefObject, useEffect } from "react"

type Ref<T extends Element> = MutableRefObject<T | null>

export interface UseIntersectionObserverProps<
    T extends Element,
    U extends Element
> {
    root: Ref<T>
    target: Ref<U>
    onEnter: () => void
    onExit: () => void
}

export function useIntersectionObserver<T extends Element, U extends Element>({
    root,
    target,
    onEnter,
    onExit,
}: UseIntersectionObserverProps<T, U>) {
    useEffect(() => {
        const { current: rootEl } = root
        const { current: targetEl } = target
        if (!rootEl || !targetEl) {
            return
        }

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio > 0) {
                    onEnter()
                } else {
                    onExit()
                }
            },
            {
                root: rootEl,
                rootMargin: "",
            }
        )

        obs.observe(targetEl)
        return () => obs.unobserve(targetEl)
    }, [root, target])
}
