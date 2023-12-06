"use client"

import { DEBUG_DATA } from "@/lib/debug-data"
import { useState } from "react"
import Details from "./details/details"
import PreviewCardList from "./preview-card-list/preview-card-list"
import Search from "./search/search"

export default function Home() {
    const [items, setItems] = useState(DEBUG_DATA)
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="flex justify-center h-full">
            <div className="flex gap-16 p-8 w-full max-w-7xl">
                <Search />
                <PreviewCardList
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    items={items}
                />
                <div className="grow flex flex-col items-center">
                    <Details data={items[activeIndex]} />
                </div>
            </div>
        </div>
    )
}
