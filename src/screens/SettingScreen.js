import React, {useState} from "react"
import {Text, View, ScrollView, StyleSheet, TouchableOpacity} from "react-native"
import CheckBox from 'expo-checkbox'
import {ThemeContext} from "../context/theme"
import {DARK_COLORS, LIGHT_COLORS} from "../store/dependencies/colors"
import {version} from "../../package.json"

export default function SettingScreen({navigation}) {
    const [isLanguage, setLanguage] = useState(true)

    return (
            <ThemeContext.Consumer>
                {(({isDark,  isLight, setIsSelected, setIsDark, setIsLight, colors}) => (
                    <ScrollView style={{backgroundColor: isDark ? "#181818" : LIGHT_COLORS.layout}}>
                        <View style={[style.container, {backgroundColor: isDark ? DARK_COLORS.layout : "white"}, style.containerLogo]}>

                        </View>
                        <View style={[style.container, {backgroundColor: isDark ? DARK_COLORS.layout : "white"}]}>
                                <Text style={style.heading}>Тема приложения</Text>
                                <View style={style.checkboxContainer}>
                                    <Text style={[style.title, {color: colors.textColor}]}>Светлая</Text>
                                    <CheckBox
                                        value={isLight}
                                        onValueChange={() => {
                                            setIsSelected("")
                                            setIsDark("")
                                            setIsLight("light")
                                        }}
                                        style={style.checkbox}
                                        color="#47B5FF"
                                    />
                                </View>
                                <View style={style.checkboxContainer}>
                                    <Text style={[style.title, {color: colors.textColor}]}>Тёмная</Text>
                                    <CheckBox
                                        colorScheme="danger" defaultIsChecked
                                        style={style.checkbox}
                                        color="#47B5FF"
                                        thumbColor={colors.thumbColor}
                                        value={isDark}
                                        onValueChange={() => {
                                            setIsSelected("")
                                            setIsLight("")
                                            setIsDark("dark")
                                        }}
                                    />
                                </View>
                        </View>
                        <View style={[style.container, {backgroundColor: isDark ? DARK_COLORS.layout : "white"}]}>
                            <Text style={style.heading}>Язык приложения</Text>
                            <View style={style.checkboxContainer}>
                                <Text style={[style.title, {color: colors.textColor}]}>Русский</Text>
                                <CheckBox
                                    disabled={true}
                                    value={isLanguage}
                                    onValueChange={setLanguage}
                                    style={style.checkbox}
                                    color="#47B5FF"
                                />
                            </View>
                        </View>
                        {/*<View style={[style.container, {backgroundColor: isDark ? DARK_COLORS.layout : "white"}]}>*/}
                        {/*    <Text style={style.heading}>Прочее</Text>*/}
                        {/*    <TouchableOpacity style={style.checkboxContainer}>*/}
                        {/*        <Text style={[style.title, {color: colors.textColor}]} onPress={() => navigation.navigate("Обратная связь")}>Обратная связь</Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}
                        <View style={style.version}>
                            <View>
                                <Text style={{color: colors.textColor}}>
                                    Версия приложения
                                </Text>
                            </View>
                            <View>
                                <Text style={{color: colors.textColor}}>
                                    {version}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                    ))}
            </ThemeContext.Consumer>
    )
}

const style = StyleSheet.create({
    container: {
        borderStyle: "solid",
        marginBottom: 7,
        paddingBottom: 7,
        paddingTop: 10
    },
    containerLogo: {
        justifyContent: "center",
        flexDirection: "row",
        padding: 15
    },
    version:{
        paddingHorizontal: 30,
        paddingVertical: 15,
        justifyContent: "space-between",
        flexDirection: "row"

    },
    heading: {
        padding: 10,
        color: "red",
        fontWeight: "bold",
        fontSize: 14
    },
     checkboxContainer: {
        flexDirection: "row",
        margin: 10,
        paddingBottom: 2,
        justifyContent: "space-between"
    },
    checkbox: {
        justifyContent: "center"
    }
})