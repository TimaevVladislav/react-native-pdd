import React from "react"
import {Alert} from "react-native"

export const AlertComponent = ({title, message, buttons = []}) => {
    return Alert.alert(title, message, buttons)
}