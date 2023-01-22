import React from "react"
import List from "../components/FloatList"
import {items} from "../store/temp/markup.json"
import {markup} from "../store/temp/markup.json"


export const ContextMarkup = React.createContext({
    horizontal: markup.horizontal,
    vertical: markup.vertical,
    item: items,
});

const Markup = (props) => {
    return <List data={items} />
};

export default Markup;