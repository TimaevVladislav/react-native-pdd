import React from 'react'
import {useNavigation} from "@react-navigation/native"

import {FlatList, Text, TouchableOpacity, View, StyleSheet} from "react-native"
import {SearchContext} from "../../context/search"
import {LocalSvg} from "../default/LocalSvg"
import {DARK_COLORS, LIGHT_COLORS} from "../../store/dependencies/colors"
import {ThemeContext} from "../../context/theme"


export default function Dropdown() {
    const navigation = useNavigation()

    const RenderDropdown = () => (
         <SearchContext.Consumer>
             {(({filtered}) => (
                 <FlatList
                     data={filtered}
                     ItemSeparatorComponent={ItemSeparator}
                     keyExtractor={(item, index) => index.toString()}
                     renderItem={({item}) => <DropdownMenu item={item} icon={item.img} heading={item.heading} text={item.text} />}
                 />
             ))}
         </SearchContext.Consumer>
    )

    const ItemSeparator = () => (
        <View style={style.separator}></View>
    )

    const Heading = ({heading, colors}) => (
        <View style={style.heading}>
            <Text style={{color: colors.textColor}}>{heading}</Text>
        </View>
    )

    const DropdownMenu = ({item, icon, heading, text}) => (
        <ThemeContext.Consumer>
            {(({isDark, colors}) => (
                <SearchContext.Consumer>
                    {(({setSearch, setClicked, setDropdown}) => (
                        <TouchableOpacity style={style.container} onPress={() => {
                            navigation.navigate("Карточка", {heading, item, icon, text})
                            setSearch("")
                            setDropdown(false)
                            setClicked(false)
                        }}
                        >
                            <View style={[style.row, {backgroundColor: isDark ? DARK_COLORS.layout : LIGHT_COLORS.layout}]}>
                                <LocalSvg asset={icon} />
                                <Heading heading={item.heading} colors={colors} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </SearchContext.Consumer>
            ))}
        </ThemeContext.Consumer>
    )

    return <RenderDropdown />
}




const style = StyleSheet.create({
    container: { padding: 10 },
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