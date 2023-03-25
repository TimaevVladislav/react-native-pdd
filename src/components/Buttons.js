import React, {useContext, useState} from "react"
import {Text, TouchableOpacity, View} from "react-native"

import {styleTicket} from "../screens/ExamScreen"
import {useColor} from "../hooks/useColor"
import {CountContext} from "../context/counter"
import {mistakes} from "../store/questions/A_B/tickets/mistakes"

export const ButtonsExam = ({item}) => {
    const [isDisabled, setIsDisabled] = useState(false)
    const {mistakeCounter, correctCounter} = useContext(CountContext)

    const {handlerColorChange, colors} = useColor()

    const addTicketHandler = (ticket) => {
        !mistakes.includes(ticket) && mistakes.push(ticket)
        mistakeHandler()
    }

    const deleteTicketHandler = (ticket) => {
        mistakes.pop(ticket)
        correctHandler()
    }

    const correctHandler = () => {
        correctCounter.current.push(true)
    }

    const mistakeHandler = () => {
       mistakeCounter.current.push(false)
    }

    return (
        item.answers.map((answer, i) => (
            <CountContext.Consumer>
                {(({isScrollId, setIsScrollId, completedTickets}) => {
                    return (
                        <View style={styleTicket.container}>
                            <TouchableOpacity
                                key={i}
                                disabled={isDisabled}
                                onPress={() => {
                                    handlerColorChange(answer, i, isScrollId)
                                    completedTickets.current++
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



