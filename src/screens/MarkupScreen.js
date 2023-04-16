import React from "react"
import List from "../components/layouts/Sections"
import {data} from "../store/dependencies/markup"

export const ContextMarkup = React.createContext({
    horizontal: data.markup.horizontal,
    vertical: data.markup.vertical,
    item: data.items,
})

const MarkupScreen = () => {
    return <List data={data.items} />
}

export default MarkupScreen