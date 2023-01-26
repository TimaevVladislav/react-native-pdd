import React from "react"
import {Text, View, StyleSheet} from "react-native"
export const CorrectAnswer = ({correct, tip}) => {
    return (
        <View>
         <Text>
             {correct}
         </Text>
         <Text style={style.correct}>
             {tip}
         </Text>
        </View>
    )
}

const style = StyleSheet.create({

    correct: {
        textAlign: "center",
        padding: 5,
        height: 40,
        width: 350,
        fontSize: 14,
    }
})