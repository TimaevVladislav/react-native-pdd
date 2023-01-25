import React from "react"
import {Text, View} from "react-native"
export const CorrectAnswer = ({correct, tip}) => {
    return (
        <View>
         <Text>{correct}</Text>
         <Text>{tip}</Text>
        </View>
    )
}