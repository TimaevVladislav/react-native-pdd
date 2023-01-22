import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native"

import {useTimer} from "../store/hooks/useTimer"



export const ArrowBack = () => {
    const { handlerConfirm } = useTimer()

    return (
        <View style={{marginRight: 35}}>
            <TouchableOpacity onPress={handlerConfirm}>
                <Ionicons
                    name="arrow-back-outline"
                    size={23}
                    color="white"
                />
            </TouchableOpacity>
        </View>
    )

}

export default function Timer() {
    const { currentSeconds, currentMinutes } = useTimer()

    const RenderTimer = () => (
        <View style={style.container}>
            <Text style={style.icon}>
                <Ionicons name="ios-timer" size={24} color="white" />
            </Text>
            { currentSeconds <= 0 ? null : <Text style={style.title}>{currentMinutes} : {currentSeconds}</Text> }
        </View>
    )

    return <RenderTimer />

}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    icon:{
        paddingTop: 2
    },
    title: {
        fontWeight: "normal",
        fontSize: 18,
        color: "#FFF"
    }
})