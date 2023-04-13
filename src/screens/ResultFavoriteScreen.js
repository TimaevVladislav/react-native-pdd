import React, {useEffect, useContext, useState} from "react"
import {View, Text, StyleSheet, Button, TouchableOpacity} from "react-native"
import {CountContext} from "../context/counter"
import Ionicons from "@expo/vector-icons/Ionicons"

import {useNavigation} from "@react-navigation/native"
import {useColor} from "../hooks/useColor"
import {favorites} from "../store/questions/A_B/tickets/favorites"

export default function ResultFavoriteScreen ({navigation}) {
    const {colorId} = useColor()
    const [passed, setPassed] = useState(false)
    const {mistakeCounter, correctCounter} = useContext(CountContext)

    navigation.setOptions({title: "Результаты", headerLeft: () => <CloseOutline /> })

    useEffect(() => {
        const clearColor = navigation.addListener('focus', () => {
            colorId.current.map((color, id) => colorId.current[id] = "#DDDDDD")
            mistakeCounter.current = []
            correctCounter.current = []
        })

        return clearColor
    }, [navigation])

    return (
        <CountContext.Consumer>
            {(({setIsScrollId, completedTickets}) => {

                if (mistakeCounter.current.length <= 2) {
                    setPassed(true)
                } else {
                    setPassed(false)
                }

                return(
                    <View style={style.container}>
                        <View>
                            <Text style={[style.heading]}>
                                {mistakeCounter.current.length <= 2 ?  "Экзамен сдан" : "Экзамен не сдан"}
                            </Text>
                        </View>
                        <Text>{`${mistakeCounter.current.length} ошибок, 20 вопросов`}</Text>
                        <View style={style.btnContainer}>
                            { passed ?
                                <Button
                                    title="Пройти ещё раз"
                                    onPress={() => {
                                        favorites.length === 0 ? navigation.navigate("Билеты") : navigation.push("Избранное")
                                        completedTickets.current = 0
                                        setIsScrollId(0)
                                    }}
                                />
                                :
                                <>
                                    <Button
                                        title="Мои ошибки"
                                        color="red"
                                        onPress={() => {
                                            navigation.navigate("Ошибки")
                                            setIsScrollId(0)
                                        }}
                                    />
                                    <Button
                                        title="Пройти ещё раз"
                                        onPress={() => {
                                            favorites.length === 0 ? navigation.navigate("Билеты") : navigation.push("Избранное")
                                            completedTickets.current = 0
                                            setIsScrollId(0)
                                        }}
                                    />
                                </>
                            }
                        </View>
                    </View>
                )
            })}
        </CountContext.Consumer>
    )
}


export const CloseOutline = () => {
    const navigation = useNavigation()

    return (
        <CountContext.Consumer>
            {(({setIsScrollId, completedTickets}) => (
                <View style={{marginRight: 20}}>
                    <TouchableOpacity onPress={() => {
                        navigation.popToTop()
                        completedTickets.current = 0
                        setIsScrollId(0)
                    }}>
                        <Ionicons name="close-outline" size={34} color="white" />
                    </TouchableOpacity>
                </View>
            ))}
        </CountContext.Consumer>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold"
    },
    btnContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 30
    }
})