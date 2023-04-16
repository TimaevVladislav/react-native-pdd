import React, {createContext} from "react"

import Section from "../components/layouts/Sections"
import {data} from "../store/dependencies/data.js"


export const ContextSigns = createContext({
    indexSigns: data.items,
    signs: [
        data.item.warning,
        data.item.priority,
        data.item.prohibition,
        data.item.prescriptive,
        data.item.special,
        data.item.info,
        data.item.services,
        data.item.extra
    ]
})


const RoadSignScreen = () => {
    return <Section data={data.items} />

}

export default RoadSignScreen