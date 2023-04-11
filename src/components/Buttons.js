import React, {useContext, useState} from "react"
import {Text, TouchableOpacity, View} from "react-native"
import {styleTicket} from "../screens/ExamScreen"
import {useColor} from "../hooks/useColor"
import {CountContext} from "../context/counter"
import {mistakes} from "../store/questions/A_B/tickets/mistakes"
import {favorites} from "../store/questions/A_B/tickets/favorites"
import {useNavigation, useRoute} from "@react-navigation/native"

export const ButtonsExam = ({item}) => {
    const [isDisabled, setIsDisabled] = useState(false)
    const {mistakeCounter, correctCounter} = useContext(CountContext)
    const navigation = useNavigation()
    const route = useRoute()
    const {handlerColorChange, colors} = useColor()

    return (
        item.answers.map((answer, i) => (
            <CountContext.Consumer>
                {(({isScrollId, setIsScrollId, completedTickets}) => {

                    if (completedTickets.current === 20) {
                        navigation.navigate("Результаты", {number: route.params.key})
                        completedTickets.current = 0
                    }

                    const addTicketHandler = (ticket) => {
                        !mistakes.includes(ticket) && mistakes.push(ticket)
                        mistakeCounter.current.push(false)
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
                                    answer.is_correct === true ? correctCounter.current.push(true) : addTicketHandler(item)
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
    const navigation = useNavigation()

    return (
        item.answers.map((answer, i) =>  (
            <CountContext.Consumer>
                {(({isScrollId, setIsScrollId, completedTickets}) => {

                    if (completedTickets.current === favorites.length - 1 + 1) {
                        navigation.navigate("Результат избранное")
                        completedTickets.current = 0
                    }

                    const questionScrollHandler = () => {
                        isScrollId === favorites.length - 1 ? setIsScrollId(favorites.length - 1) : setIsScrollId(isScrollId + 1)
                    }


                    return(
                        <View style={styleTicket.container} >
                            <TouchableOpacity
                                key={i}
                                disabled={isDisabled}
                                onPress={() => {
                                    completedTickets.current++
                                    setIsDisabled(true)
                                    handlerColorChange(answer, i, isScrollId)
                                    questionScrollHandler()
                                    ticketNumber.current = item.ticket_number
                                    ticketId.current = item.ticket_question
                                }}
                                style={[{backgroundColor: colors[i] }, styleTicket.item]}>
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

export const ButtonsMistakes = ({item}) => {
    const [isDisabled, setIsDisabled] = useState(false)
    const colorId = useColor()
    const navigation = useNavigation()
    const {handlerColorChange, colors} = useColor()

    return (
        item.answers.map((answer, i) => (
            <CountContext.Consumer>
                {(({isScrollId, setIsScrollId, completedTickets}) => {

                    if (completedTickets.current === mistakes.length - 1 + 1) {
                        navigation.navigate("Результат ошибки")
                        completedTickets.current = 0
                    }

                    const questionScrollHandler = () => {
                        isScrollId === mistakes.length - 1 ? setIsScrollId(mistakes.length - 1) : setIsScrollId(isScrollId + 1)
                    }

                    const deleteTicketHandler = () => {
                          mistakes.splice(isScrollId, 1)
                    }

                    return (
                        <View style={styleTicket.container}>
                            <TouchableOpacity
                                key={i}
                                disabled={isDisabled}
                                onPress={() => {
                                    handlerColorChange(answer, i, isScrollId)
                                    completedTickets.current++
                                    setIsDisabled(true)
                                    questionScrollHandler()
                                    answer.is_correct === true ? deleteTicketHandler(item) : null
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

