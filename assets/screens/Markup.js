import React from "react"
import List from "../components/layouts/Sections"
import {data} from "../store/data/markup"

export const ContextMarkup = React.createContext({
    horizontal: data.markup.horizontal,
    vertical: data.markup.vertical,
    item: data.items,
})

const Markup = () => {
    return <List data={data.items} />
}

export default Markup