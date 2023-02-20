import React, {useContext, useState} from "react"
import {Text, TouchableOpacity, View} from "react-native"


import {styleTicket} from "../screens/ExamScreen"
import {useColor} from "../hooks/useColor"
import {useScroll} from "../hooks/useScroll"

export const ButtonsExam = ({answers}) => {
    const {index} = useScroll()
    const [isDisabled, setIsDisabled] = useState(false)
    const {handlerColorChange, colors} = useColor()

    return (
        answers.map((answer, i) =>  (
                <View style={styleTicket.container}>
                    <TouchableOpacity
                        key={i}
                        disabled={isDisabled}
                        onPress={() => {setIsDisabled(true), handlerColorChange(answer, i)}}
                        style={[{backgroundColor: colors[i] }, styleTicket.item]}>
                        <Text style={styleTicket.itemText}>
                            {`${i + 1}.  ${answer.answer_text}`}
                        </Text>
                    </TouchableOpacity>
                </View>
        ))
    )
}

export const ButtonFavorites = ({answers}) => {
    const {handlerColorChange, colors} = useColor()
    const [isDisabled, setIsDisabled] = useState(false)

    return (
        answers.map((answer, i) =>  (
            <View style={styleTicket.container} >
                <TouchableOpacity
                    key={i}
                    disabled={isDisabled}
                    onPress={() => {setIsDisabled(true), handlerColorChange(answer, i)}}
                    style={[{backgroundColor: colors[i] }, styleTicket.item]}>
                    <Text style={styleTicket.itemText}>
                        {`${i + 1}.  ${answer.answer_text}`}
                    </Text>
                </TouchableOpacity>
            </View>
        ))
    )
}



