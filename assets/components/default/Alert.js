import React from "react"
import {Alert} from "react-native"
import {useNavigation} from "@react-navigation/native"


export const AlertComponent = ({title, message, text, buttons = []}) => {

    const navigation = useNavigation()
    return (
        Alert.alert(
            "Хотите выйти?",
            `Можно продолжить потом`,
            [
                {
                    text: "Продолжить",
                    onPress: () => console.log("swsw"),
                    style: "cancel",

                },
                {   text: `Выйти`,
                    style: "cancel",
                    onPress: () => {
                        navigation.navigate("Список билетов")
                    }
                }
            ]
        )
    )
}
