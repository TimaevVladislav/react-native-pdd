import React, {useEffect, useContext} from "react"
import {
    ScrollView,
    Text,
    View
} from "react-native"
import {SvgUri} from "react-native-svg"
import {styleSigns} from "../store/globalStyle"

import {ThemeContext} from "../store/provider/ThemeProvider"
import {DARK_COLORS, LIGHT_COLORS} from "../store/colors"
import {SearchContext} from "../store/provider/SearchProvider"

export default function Card({route, navigation}) {

    const { setDropdown, setSearch, setClicked } = useContext(SearchContext)

    const closeDropdownHandler = () => {
        setSearch(""),
        setDropdown(true),
        setClicked(true)
    }

    useEffect(() => {
        const clearDropdown = navigation.addListener('beforeRemove', (e) => {
            if(!e.data.closing){
               closeDropdownHandler()
            }
        });
        return clearDropdown
    }, [navigation])


    return (
        <ThemeContext.Consumer>
            {(({isDark, setColorScheme, colors}) => (
                <ScrollView style={{backgroundColor: isDark ? DARK_COLORS.layout : LIGHT_COLORS.layout}}>
                    <Text style={[styleSigns.heading, {color: colors.textColor}]}>
                        {route.params.heading}
                    </Text>
                    <View style={styleSigns.p}>
                        <SvgUri uri={route.params.icons}/>
                    </View>
                    <View>
                        <Text style={[styleSigns.title, {color: colors.textColor}]}>
                            {route.params.titles}
                        </Text>
                        <Text style={[styleSigns.text, {color: colors.textColor}]}>
                            {route.params.texts}
                        </Text>
                    </View>
                </ScrollView>
                ))}
        </ThemeContext.Consumer>
    )
}



