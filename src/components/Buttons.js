import React, {useState} from "react"
import {Text, TouchableOpacity, View} from "react-native"

import {styleTicket} from "../screens/ExamScreen"
import {useColor} from "../hooks/useColor"

import {CountContext} from "../store/provider/CountProvider"
import {useNavigation} from "@react-navigation/native"


export const ButtonsExam = ({answers, item}) => {
    const [isDisabled, setIsDisabled] = useState(false)
    const {handlerColorChange, colors} = useColor(item)
    const navigation = useNavigation()

    return (
        answers.map((answer, i) => (
            <CountContext.Consumer>
                {(({isScrollId, setIsScrollId}) => {

                    const buttonHandler = () => {
                        handlerColorChange(answer, i)
                        setIsScrollId(isScrollId + 1)
                        navigation.setParams({id: isScrollId + 1 })
                        setIsDisabled(true)
                    }

                    return (
                        <View style={styleTicket.container}>
                            <TouchableOpacity
                                key={i}
                                disabled={isDisabled}
                                onPress={buttonHandler}
                                style={[{backgroundColor: colors[i]}, styleTicket.item]}>
                                <Text style={styleTicket.itemText}>
                                    {`${i + 1}.  ${answer.answer_text}`}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </CountContext.Consumer>
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



