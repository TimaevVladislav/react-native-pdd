import React, {useEffect, useContext} from "react"
import {ScrollView, Text, View} from "react-native"

import {styleSigns} from "../../store/data/styles"
import {ThemeContext} from "../../context/theme"
import {DARK_COLORS, LIGHT_COLORS} from "../../store/data/colors"
import {SearchContext} from "../../context/search"
import {LocalSvg} from "./LocalSvg"

export default function Card({route, navigation}) {

    const {setDropdown, setSearch, setClicked} = useContext(SearchContext)

    navigation.setOptions({title: route.params.heading})

    const closeDropdownHandler = () => {
        setSearch("")
        setDropdown(true)
        setClicked(true)
    }

    useEffect(() => {
        const clearDropdown = navigation.addListener('beforeRemove', (e) => {
            if(!e.data.closing){
               closeDropdownHandler()
            }
        })

        return clearDropdown
    }, [navigation])


    return (
        <ThemeContext.Consumer>
            {(({isDark, colors}) => (
                <ScrollView style={{backgroundColor: isDark ? DARK_COLORS.layout : LIGHT_COLORS.layout}}>
                    <Text style={[styleSigns.heading, {color: colors.textColor}]}>
                        {route.params.item.heading}
                    </Text>
                    <View style={styleSigns.p}>
                        <LocalSvg asset={route.params.icon} />
                    </View>
                    <View>
                        <Text style={[styleSigns.title, {color: colors.textColor}]}>
                            {route.params.item.title}
                        </Text>
                        <Text style={[styleSigns.text, {color: colors.textColor}]}>
                            {route.params.item.text}
                        </Text>
                    </View>
                </ScrollView>
                ))}
        </ThemeContext.Consumer>
    )
}



