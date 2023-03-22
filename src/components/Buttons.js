import React, {useState} from "react"
import {Text, TouchableOpacity, View} from "react-native"

import {styleTicket} from "../screens/ExamScreen"
import {useColor} from "../hooks/useColor"
import {CountContext} from "../context/counter"
import {mistakes} from "../store/questions/A_B/tickets/mistakes"
import {useNavigation} from "@react-navigation/native"

export const ButtonsExam = ({answers, item, ticket_number}) => {

    const navigation = useNavigation()
    const [isDisabled, setIsDisabled] = useState(false)
    const {handlerColorChange, colors} = useColor(item)

    const addTicketHandler = (ticket) => {
        !mistakes.includes(ticket) && mistakes.push(ticket)
    }

    const deleteTicketHandler = (ticket) => {
        mistakes.pop(ticket)
    }

    return (
        answers.map((answer, i) => (
            <CountContext.Consumer>
                {(({isScrollId, setIsScrollId, ticketId, setTicketId}) => {
                    return (
                        <View style={styleTicket.container}>
                            <TouchableOpacity
                                key={i}
                                disabled={isDisabled}
                                onPress={() => {
                                    handlerColorChange(answer, i, isScrollId)
                                    setIsScrollId(isScrollId + 1)
                                    setTicketId(ticket_number)
                                    navigation.setOptions({title: `Билет ${ticketId} вопрос ${isScrollId + 2}`})
                                    setIsDisabled(true)
                                    answer.is_correct === true ? deleteTicketHandler(item) : addTicketHandler(item)
                                }}
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



