import { ActiveJobProvider } from "@/lib/providers/active-job-provider"
import { DetailsContainer } from "../details/details-container"
import SearchBar from "../mobile/search-bar"
import PreviewListContainer from "../preview-list/preview-list-container"

export function TabletLayout() {
    return (
        <ActiveJobProvider shouldDefault={true}>
            <div className="h-full p-8 flex flex-col gap-6 items-center">
                <div className="max-w-xl w-full">
                    <SearchBar wide />
                </div>
                <div className="h-full overflow-hidden grid gap-8 justify-center grid-cols-[minmax(16rem,1fr)_2fr]">
                    <PreviewListContainer />
                    <DetailsContainer />
                </div>
            </div>
        </ActiveJobProvider>
    )
}
