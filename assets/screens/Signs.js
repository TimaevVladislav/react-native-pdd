import React, {createContext} from "react"

import List from "../components/FloatList"
import {items} from "../store/temp/signs.json"
import {item} from "../store/temp/signs.json"

export const ContextSigns = createContext({
    indexSigns: items ,
    signs: [
        item.warning,
        item.priority,
        item.prohibition,
        item.prescriptive,
        item.special,
        item.info,
        item.services,
        item.extra
    ]
})


const Signs = () => {
    return <List data={items} />

}

export default Signs;