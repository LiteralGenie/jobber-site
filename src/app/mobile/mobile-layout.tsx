import { ActiveJobProvider } from "@/lib/providers/active-job-provider"
import { useState } from "react"
import { MobilePreviewCardListContainer } from "./mobile-preview-card-list-container"

export function MobileLayout() {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <ActiveJobProvider shouldDefault={false}>
            <MobilePreviewCardListContainer />
        </ActiveJobProvider>
    )
}
