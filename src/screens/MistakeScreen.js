import React, {useRef, useState, useEffect, useContext} from "react"
import {SafeAreaView, View, FlatList, Text, Image, TouchableOpacity} from "react-native"


import {stylesVirtual, styleTicket} from "./ExamScreen"
import {mistakes} from "../store/questions/A_B/tickets/mistakes"
import {CountContext} from "../context/counter"
import {Favorites} from "../components/layouts/Favorites"
import {ButtonsMistakes} from "../components/Buttons"
import {useColor} from "../hooks/useColor"
import {useRoute} from "@react-navigation/native"
import {ArrowClose} from "../components/ArrowClose"
import {useLayout} from "../hooks/useLayout"

const Tickets = ({item, navigation, ticketId, ticketNumber}) => {
    const [ticketNumberLocal, setTicketNumberLocal] = useState(null)
    const [ticketIdLocal, setTicketIdLocal] = useState(null)

    const optionFirstHandler = () => {
        setTicketIdLocal(item.ticket_question + 1)
        setTicketNumberLocal(item.ticket_number)
    }

    useEffect(() => {
        optionFirstHandler()
        ticketNumber.current = item.ticket_number
        ticketId.current = item.ticket_question
    },[item.ticket_number, item.ticket_question])

    navigation.setOptions({title: `Билет ${ticketNumber.current === null ? ticketNumberLocal : ticketNumber.current} вопрос ${ticketId.current === null ? ticketIdLocal : ticketId.current + 1}`})

    return (
        <View>
            <View style={styleTicket.container}>
                <Image source={item.image} style={styleTicket.img} />
            </View>
            <View>
                <Text style={styleTicket.title}>
                    {item.question}
                </Text>
                <ButtonsMistakes item={item} />
                <Favorites item={item} />
            </View>
        </View>
    )
}

export default function MistakeScreen({navigation}) {
    const ref = useRef()
    const ticketNumber = useRef(null)
    const route = useRoute()
    const ticketId = useRef(null)
    const {isScrollId} = useContext(CountContext)
    const {colorId} = useColor()
    const {scrollItemLayout} = useLayout()

    if (mistakes.length < 0) {
        navigation.navigate("Билеты")
    }

    navigation.setOptions({headerLeft: () => <ArrowClose /> })

    useEffect(() => {
        const clearColor = navigation.addListener("beforeRemove", () => {
            colorId.current.map((color, id) => colorId.current[id] = "#DDDDDD")
        })

        return clearColor
    }, [navigation, route])

    useEffect(() => {
        ref.current.scrollToOffset({
            index: isScrollId,
            offset: 390 * isScrollId,
            animated: true
        })
    }, [isScrollId])

    const TicketScrollFavorites = () => {
        const {getItemLayout} = useLayout()
        const ref = useRef()

        useEffect(() => {
            ref.current.scrollToIndex({
                index: isScrollId,
                offset: 390 * isScrollId,
                animated: true
            })
        }, [isScrollId])


        const QuestionScroll = ({item, index}) => (
            <CountContext.Consumer>
                {(({isScrollId, setIsScrollId}) => {
                    return (
                        <View style={stylesVirtual.container}>
                            <TouchableOpacity style={stylesVirtual.container}>
                                <View style={[{backgroundColor: isScrollId === index ? "#FAF7F0" : colorId.current[index] }]}>
                                    <Text style={stylesVirtual.title} onPress={() => {
                                        setIsScrollId(index)
                                        ticketNumber.current = item.ticket_number
                                        ticketId.current = item.ticket_question
                                    }}>
                                        {index + 1}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </CountContext.Consumer>
        )

        return (
                <SafeAreaView>
                    <FlatList
                        ref={ref}
                        horizontal
                        initialScrollIndex={isScrollId}
                        getItemLayout={getItemLayout}
                        data={mistakes}
                        renderItem={({item, index}) => <QuestionScroll item={item} index={index} /> }
                        initialNumToRender={20}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
        )
    }


    return (
        <CountContext.Consumer>
            {(({isScrollId}) => (
                <SafeAreaView>
                    <TicketScrollFavorites />
                    <FlatList
                        ref={ref}
                        horizontal
                        getItemLayout={scrollItemLayout}
                        initialNumToRender={20}
                        initialScrollIndex={isScrollId}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        data={mistakes}
                        renderItem={({item}) => <Tickets item={item} ticketNumber={ticketNumber} ticketId={ticketId} navigation={navigation} />  }
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            ))}
        </CountContext.Consumer>
    )
}

