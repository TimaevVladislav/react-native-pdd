import React, {createContext} from "react"
import List from "../components/layouts/Sections"
import {items, item} from "../store/temp/rules.json"

export const ContextRules = createContext({
     rules: [
         item.list, item.list2, item.list3,
         item.list4, item.list5, item.list6,
         item.list7, item.list8, item.list9,
         item.list10, item.list11, item.list12,
         item.list13, item.list14, item.list15,
         item.list16, item.list17, item.list18,
         item.list19, item.list20, item.list21,
         item.list22, item.list23, item.list24,
         item.list25, item.list26],
     indexRules: items,
})


const Profile = (props) => {
    return <List data={items} />
};

export default Profile;

