import React, {useContext, useEffect} from "react"
import {useNavigation} from "@react-navigation/native"
import {CountContext} from "../context/counter"
import {TouchableOpacity, View} from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import {useColor} from "../hooks/useColor"

export const ArrowClose = () => {
    const navigation = useNavigation()
    const {colorId} = useColor()

    useEffect(() => {
        const clearColor = navigation.addListener("beforeRemove", () => {
            colorId.current.map((color, id) => colorId.current[id] = "#DDDDDD")
        })

        return clearColor
    }, [navigation])

    return (
        <CountContext.Consumer>
            {(({setIsScrollId, completedTickets}) => (
                <View style={{marginRight: 20}}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Билеты")
                        completedTickets.current = 0
                        setIsScrollId(0)
                    }}>
                        <Ionicons name="arrow-back-outline" size={23} color="white" />
                    </TouchableOpacity>
                </View>
            ))}
        </CountContext.Consumer>
    )
}