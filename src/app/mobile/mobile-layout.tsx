import { ActiveJobProvider } from "@/lib/providers/active-job-provider"
import { DetailsDialog } from "./details-dialog"
import { MobilePreviewListContainer } from "./mobile-preview-list-container"

export function MobileLayout() {
    return (
        <ActiveJobProvider shouldDefault={false}>
            <MobilePreviewListContainer />
            <DetailsDialog />
        </ActiveJobProvider>
    )
}
