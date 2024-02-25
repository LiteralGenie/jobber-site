import { ActiveJobProvider } from "@/lib/providers/active-job-provider"
import { useState } from "react"
import { MobilePreviewListContainer } from "./mobile-preview-list-container"

export function MobileLayout() {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <ActiveJobProvider shouldDefault={false}>
            <MobilePreviewListContainer />
        </ActiveJobProvider>
    )
}
