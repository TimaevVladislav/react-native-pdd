import React, {useState} from "react"
import {Text, TouchableOpacity, View} from "react-native"

import {styleTicket} from "../screens/ExamScreen"
import {useColor} from "../hooks/useColor"
import {CountContext} from "../context/counter"
import {mistakes} from "../store/questions/A_B/tickets/mistakes"

export const ButtonsExam = ({answers, item}) => {
    const [isDisabled, setIsDisabled] = useState(false)

    const {handlerColorChange, colors} = useColor()

    const addTicketHandler = (ticket) => {
        !mistakes.includes(ticket) && mistakes.push(ticket)
    }

    const deleteTicketHandler = (ticket) => {
        mistakes.pop(ticket)
    }

    return (
        answers.map((answer, i) => (
            <CountContext.Consumer>
                {(({isScrollId, setIsScrollId, results}) => {
                    return (
                        <View style={styleTicket.container}>
                            <TouchableOpacity
                                key={i}
                                disabled={isDisabled}
                                onPress={() => {
                                    handlerColorChange(answer, i, isScrollId)
                                    results.current++
                                    setIsScrollId(isScrollId + 1)
                                    setIsDisabled(true)
                                    answer.is_correct === true ? deleteTicketHandler(item) : addTicketHandler(item)
                                }}
                                style={[{backgroundColor: colors[i]}, styleTicket.item]}
                            >
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

export const ButtonFavorites = ({item, ticketNumber, ticketId}) => {
    const {handlerColorChange, colors} = useColor()
    const [isDisabled, setIsDisabled] = useState(false)

    return (
        item.answers.map((answer, i) =>  (
            <CountContext.Consumer>
                {(({isScrollId, setIsScrollId}) => (
                    <View style={styleTicket.container} >
                        <TouchableOpacity
                            key={i}
                            disabled={isDisabled}
                            onPress={() => {
                                setIsDisabled(true)
                                handlerColorChange(answer, i, isScrollId)
                                setIsScrollId(isScrollId + 1)
                                ticketNumber.current = item.ticket_number
                                ticketId.current = item.ticket_question
                            }}
                            style={[{backgroundColor: colors[i] }, styleTicket.item]}>
                            <Text style={styleTicket.itemText}>
                                {`${i + 1}.  ${answer.answer_text}`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </CountContext.Consumer>
        ))
    )
}



