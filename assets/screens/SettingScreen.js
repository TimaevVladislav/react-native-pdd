import React, {useState} from "react"
import {Text, View, ScrollView, StyleSheet, TouchableOpacity} from "react-native"

import CheckBox from 'expo-checkbox'
import {ThemeContext} from "../store/provider/ThemeProvider"
import {DARK_COLORS, LIGHT_COLORS} from "../store/data/colors"

export default function SettingScreen({navigation}) {
    const [isLanguage, setLanguage] = useState(false)
    const [isLanguageRus, setLanguageRus] = useState(false)

    return (
            <ThemeContext.Consumer>
                {(({isDark,  isLight, isSelected, setIsSelected, setIsDark, setIsLight, colors}) => (
                    <ScrollView style={{backgroundColor: isDark ? "#181818" : LIGHT_COLORS.layout}}>
                        <View style={[style.container, {backgroundColor: isDark ? DARK_COLORS.layout : "white"}, style.containerLogo]}>

                        </View>
                        <View style={[style.container, {backgroundColor: isDark ? DARK_COLORS.layout : "white"}]}>
                                <Text style={style.heading}>Тема приложения</Text>
                                <View style={style.checkboxContainer}>
                                    <Text style={[style.title, {color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}]}>Системная</Text>
                                    <CheckBox
                                        value={isSelected}
                                        onValueChange={() => {
                                            setIsLight("")
                                            setIsDark("")
                                            setIsSelected("light")
                                        }}
                                        style={style.checkbox}
                                        color="#47B5FF"
                                    />
                                </View>
                                <View style={style.checkboxContainer}>
                                    <Text style={[style.title, {color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}]}>Светлая</Text>
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
                                    <Text style={[style.title, {color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}]}>Тёмная</Text>
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
                                <Text style={[style.title, {color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}]}>Руский</Text>
                                <CheckBox
                                    value={isLanguage}
                                    onValueChange={setLanguage}
                                    style={style.checkbox}
                                    color="#47B5FF"
                                />
                            </View>
                            <View style={style.checkboxContainer}>
                                <Text style={[style.title, {color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}]}>Кыргызча</Text>
                                <CheckBox
                                    value={isLanguageRus}
                                    onValueChange={setLanguageRus}
                                    style={style.checkbox}
                                    color="#47B5FF"
                                />
                            </View>
                        </View>
                        <View style={[style.container, {backgroundColor: isDark ? DARK_COLORS.layout : "white"}]}>
                            <Text style={style.heading}>Уведомления</Text>
                            <TouchableOpacity style={style.checkboxContainer}>
                                <Text style={[style.title, {color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}]} onPress={() => navigation.navigate("Главная")}>Настроить</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[style.container, {backgroundColor: isDark ? DARK_COLORS.layout : "white"}]}>
                            <Text style={style.heading}>Прочее</Text>
                            <TouchableOpacity style={style.checkboxContainer}>
                                <Text style={[style.title, {color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}]} onPress={() => navigation.navigate("Обратная связь")}>Обратная связь</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.checkboxContainer}>
                                <Text style={[style.title, {color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}]} onPress={() => navigation.navigate("Пользовательское соглашение")}>Пользовательское соглашение</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.version}>
                            <View>
                                <Text style={{color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}}>
                                    Версия приложения
                                </Text>
                            </View>
                            <View>
                                <Text style={{color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}}>
                                    1.1
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                    ))}
            </ThemeContext.Consumer>
    )
}

export const Policies = () => (
    <View>
        <Text>hello</Text>
    </View>
)


const style = StyleSheet.create({
    container: {
        borderStyle: "solid",
        marginBottom: 7,
        paddingBottom: 7,
        paddingTop: 10,
    },
    containerLogo: {
        justifyContent: "center",
        flexDirection: "row",
        padding: 15,
    },
    version:{
        paddingHorizontal: 30,
        paddingVertical: 15,
        justifyContent: "space-between",
        flexDirection: "row",

    },
    heading: {
        padding: 10,
        color: "red",
        fontWeight: "bold",
        fontSize: 14,
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