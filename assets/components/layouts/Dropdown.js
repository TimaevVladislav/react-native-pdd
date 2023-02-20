import React from 'react'
import {useNavigation} from "@react-navigation/native"

import {FlatList, Text, TouchableOpacity, View, StyleSheet} from "react-native"
import {SearchContext} from "../../store/provider/SearchProvider"
import {LocalSvg} from "../default/LocalSvg"

export default function Dropdown() {
    const navigation = useNavigation()
    const RenderDropdown = () => (
        <SearchContext.Consumer>
            {(({filtered}) => (
                <FlatList
                    data={filtered}
                    ItemSeparatorComponent={ItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <DropdownMenu item={item} icon={item.img} heading={item.heading} />}
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

    const DropdownMenu = ({item, icon, heading}) => (
        <SearchContext.Consumer>
            {(({setSearch, setClicked, setDropdown}) => (
                <TouchableOpacity style={style.container} onPress={() => {navigation.navigate("Карточка", {
                    heading: heading,
                    item: item,
                    icon: icon
                }), dropdownHandler(setSearch, setDropdown, setClicked)
                }}>
                    <View style={style.row}>
                        <LocalSvg asset={icon} />
                        <Heading heading={item.heading} />
                    </View>
                </TouchableOpacity>
            ))}
        </SearchContext.Consumer>
    )

    return <RenderDropdown />
}

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