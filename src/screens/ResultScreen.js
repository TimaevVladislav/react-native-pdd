import React, {useEffect, useContext} from "react"
import {View, Text, StyleSheet, Button, TouchableOpacity} from "react-native"
import {CountContext} from "../context/counter"
import Ionicons from "@expo/vector-icons/Ionicons"
import {useNavigation, useRoute} from "@react-navigation/native"
import {useColor} from "../hooks/useColor"
import {useSwitcher} from "../store/questions"

export default function ResultScreen () {
    const {colorId} = useColor()
    const navigation = useNavigation()
    const {mistakeCounter, correctCounter} = useContext(CountContext)

    navigation.setOptions({title: "Результаты", headerLeft: () => <CloseOutline /> })

    useEffect(() => {
        const clearColor = navigation.addListener('beforeRemove', () => {
            colorId.current.map((color, id) => colorId.current[id] = "#DDDDDD")
            mistakeCounter.current = []
            correctCounter.current = []
        })

        return clearColor
    }, [navigation])

    return (
        <CountContext.Consumer>
            {(({setIsScrollId, completedTickets}) => (
        <View style={style.container}>
            <View>
                <Text style={[style.heading]}>
                    {correctCounter.current.length < 18 ?  "Экзамен не сдан" : "Экзамен сдан"}
                </Text>
            </View>
            <Text>{`${mistakeCounter.current.length} ошибок, 20 вопросов`}</Text>
            <View style={style.btnContainer}>
                <Button
                    title="Мои ошибки"
                    color="red"
                    onPress={() => navigation.navigate("Ошибки")}
                />
                <Button
                    title="Пройти ещё раз"
                    onPress={() => {
                        navigation.goBack()
                        completedTickets.current = 0
                        setIsScrollId(0)
                    }}
                />
            </View>
         </View>
            ))}
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
                    <Ionicons name="close-outline" size={35} color="white" />
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
