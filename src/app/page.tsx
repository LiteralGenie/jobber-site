"use client"

import { DEBUG_DATA } from "@/lib/debug-data"
import PreviewCardList from "./preview-card-list/preview-card-list"
import Search from "./search/search"
import { useState } from "react"

export default function Home() {
    const [items, setItems] = useState(DEBUG_DATA)

    return (
        <div className="flex justify-center">
            <div className="flex gap-16 p-8 w-full max-w-6xl">
                <Search />
                <PreviewCardList items={items} />
                <div className="grow flex flex-col items-center">
                    <div>details</div>
                </div>
            </div>
        </div>
    )
}
