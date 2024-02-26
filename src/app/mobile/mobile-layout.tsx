import { ActiveJobProvider } from "@/lib/providers/active-job-provider"
import { useState } from "react"
import { DetailsDialog } from "./details-dialog"
import { MobilePreviewListContainer } from "./mobile-preview-list-container"

export function MobileLayout() {
    const [prevPageIsList, setPrevPageIsList] = useState(false)

    return (
        <ActiveJobProvider shouldDefault={false}>
            <MobilePreviewListContainer
                onCardClick={() => setPrevPageIsList(true)}
            />
            <DetailsDialog shouldPopStateOnClose={prevPageIsList} />
        </ActiveJobProvider>
    )
}
