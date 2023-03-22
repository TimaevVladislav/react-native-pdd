import React, { useState } from "react"

export const useLayout = () => {

    const [isScrollId, setIsScrollId] = useState(0)
    const getItemLayout = (data, index) => {
        const FIXED_ITEM_HEIGHT = 100
        const NUM_COLUMNS = 3
        return {
            length: index,
            index,
            offset: FIXED_ITEM_HEIGHT * Math.floor(index / NUM_COLUMNS),
            animated: true,
        }
    }

    const scrollItemLayout = (data, index) => {
        const FIXED_ITEM_HEIGHT = 100
        const NUM_COLUMNS = 3
        return {
            length: index,
            index,
            offset: FIXED_ITEM_HEIGHT * Math.floor(index / NUM_COLUMNS),
            animated: false
        }
    }

    return {isScrollId, setIsScrollId, getItemLayout, scrollItemLayout}
}