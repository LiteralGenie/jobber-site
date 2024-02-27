import { ActiveJobProvider } from "@/lib/providers/active-job-provider"
import { DetailsContainer } from "../details/details-container"
import SearchBar from "../mobile/search-bar"
import PreviewListContainer from "../preview-list/preview-list-container"
import { TopBar } from "../top-bar/top-bar"

export function TabletLayout() {
    return (
        <ActiveJobProvider shouldDefault={true}>
            <div className="h-full flex flex-col">
                <TopBar />

                <div className="h-full min-h-0 p-8 pt-8 flex flex-col gap-6 items-start">
                    <div className="max-w-xl w-full">
                        <SearchBar />
                    </div>
                    <div className="h-full overflow-hidden grid gap-8 justify-center grid-cols-[minmax(20rem,1fr)_2fr]">
                        <PreviewListContainer />
                        <DetailsContainer />
                    </div>
                </div>
            </div>
        </ActiveJobProvider>
    )
}
