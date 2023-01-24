import React, { useState } from 'react'
import {useNavigation} from "@react-navigation/native"

import {FlatList, Text, TouchableOpacity, View, StyleSheet} from "react-native"
import {SearchContext} from "../store/provider/SearchProvider"
import {svgSigns, svgMarkup} from "./SvgXml"
import {SvgXml} from "react-native-svg"

export default function Dropdown({iconId}) {

    const initialIcons = [
        { id: 0, icon: svgSigns[0] },
        { id: 1, icon: svgSigns[1] },
        { id: 2, icon: svgSigns[2] },
        { id: 3, icon: svgSigns[3] },
        { id: 4, icon: svgSigns[4] },
        { id: 5, icon: svgSigns[5] },
        { id: 6, icon: svgSigns[6] }
    ]
    const navigation = useNavigation()
    const [icon, setIcon] = useState(initialIcons)

    const Icons = () => (
        <View>
            <SvgXml xml={icon[iconId].icon} width={100} height={87} />
        </View>
    )

    const RenderDropdown = () => (
        <SearchContext.Consumer>
            {(({filtered}) => (
                <FlatList
                    data={filtered}
                    ItemSeparatorComponent={ItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <DropdownMenu heading={item.heading} title={item.title} icon={item.img} text={item.text} />}
                />
            ))}
        </SearchContext.Consumer>
    )

    const dropdownHandler = (setSearch, setDropdown, setClicked) => {
        setSearch(""), setDropdown(false), setClicked(false)
    }
    const ItemSeparator = () => (
        <View style={style.separator}></View>
    )

    const Heading = ({heading}) => (
        <View style={style.heading}>
            <Text>{heading}</Text>
        </View>
    )



    const DropdownMenu = ({heading, title, text, icon}) => (
        <SearchContext.Consumer>
            {(({setSearch, setClicked, setDropdown}) => (
                <TouchableOpacity style={style.container} onPress={() => {
                    navigation.navigate("Карточка", { heading: heading, icons: icon, titles: title, texts: text }),
                    dropdownHandler(setSearch, setDropdown, setClicked) }}
                >
                    <View style={style.row}>
                        <Icons />
                        <Heading heading={heading} />
                    </View>
                </TouchableOpacity>
            ))}
        </SearchContext.Consumer>
    )

    return <RenderDropdown />
};

const style = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#fff"
    },
    row: {
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center"
    },
    logoIcon: {
      backgroundColor: "grey",
      justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      borderRadius: 50,
      padding: 10
    },
    heading: {
        marginLeft: 20
    },
    separator:{
        height: 0.4,
        backgroundColor: "grey",
        opacity: 0.5,
        marginLeft: 10,
        marginRight: 10
    }
})