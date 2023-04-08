import React, {useContext, useState} from "react"
import {Text, TouchableOpacity, View} from "react-native"
import {styleTicket} from "../screens/ExamScreen"
import {useColor} from "../hooks/useColor"
import {CountContext} from "../context/counter"
import {mistakes} from "../store/questions/A_B/tickets/mistakes"
import {useNavigation, useRoute} from "@react-navigation/native"

export const ButtonsExam = ({item}) => {
    const [isDisabled, setIsDisabled] = useState(false)
    const {mistakeCounter, correctCounter} = useContext(CountContext)
    const navigation = useNavigation()
    const route = useRoute()
    const {handlerColorChange, colors} = useColor()

    const addTicketHandler = (ticket) => {
        !mistakes.includes(ticket) && mistakes.push(ticket)
        mistakeHandler()
    }

    const deleteTicketHandler = (ticket) => {
        mistakes.filter((mistake, id) => id !== ticket.id)
        correctHandler()
    }

    const correctHandler = () => {
        correctCounter.current.push(true)
    }

    const mistakeHandler = () => {
        mistakeCounter.current.push(false)
    }


    const questionScrollHandler = () => {
        isScrollId === renderTicket.current.slice(-10) ? setIsScrollId(renderTicket.current.pop()) : setIsScrollId(isScrollId + 1)
    }

    return (
        item.answers.map((answer, i) => (
            <CountContext.Consumer>
                {(({isScrollId, setIsScrollId, completedTickets}) => {

                    if (completedTickets.current === 20) {
                        navigation.navigate("Результат", {number: route.params.key})
                        completedTickets.current = 0
                    }
                    return (
                        <View style={styleTicket.container}>
                            <TouchableOpacity
                                key={i}
                                disabled={isDisabled}
                                onPress={() => {
                                    handlerColorChange(answer, i, isScrollId)
                                    completedTickets.current++
                                    isScrollId === 19 ? setIsScrollId(19) : setIsScrollId(isScrollId + 1)
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

export const ButtonsMistakes = ({item}) => {
    const [isDisabled, setIsDisabled] = useState(false)
    const {mistakeCounter, correctCounter} = useContext(CountContext)
    const navigation = useNavigation()
    const {handlerColorChange, colors} = useColor()


    const addTicketHandler = (ticket) => {
        !mistakes.includes(ticket) && mistakes.push(ticket)
        mistakeHandler()
    }

    const deleteTicketHandler = (ticket, is_correct) => {
        is_correct ? mistakes.filter((mistake, id) => id !== ticket.id) :
        mistakes.length === 0 ? navigation.navigate("Билеты") : null
        correctHandler()
    }

    const correctHandler = () => {
        correctCounter.current.push(true)
    }

    const mistakeHandler = () => {
        mistakeCounter.current.push(false)
    }

    const questionScrollHandler = () => {
        isScrollId === mistakes.slice(-1) ? setIsScrollId(mistakes.pop()) : setIsScrollId(isScrollId + 1)
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
                                    setIsDisabled(true)
                                    isScrollId === 19 ? setIsScrollId(19) : setIsScrollId(isScrollId + 1)
                                    deleteTicketHandler(item, answer.is_correct)
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

