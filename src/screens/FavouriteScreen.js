import React, {useRef, useEffect, useContext, useState} from "react"
import {SafeAreaView, View, FlatList, Text, Image, TouchableOpacity} from "react-native"

import {stylesVirtual, styleTicket} from "./ExamScreen"
import {favorites} from "../store/questions/A_B/tickets/favorites.js"

import {Favorites} from "../components/layouts/Favorites"
import {ButtonFavorites} from "../components/Buttons"
import {useColor} from "../hooks/useColor"
import {useScroll} from "../hooks/useScroll"
import {CountContext} from "../context/counter"

const Tickets = ({item, navigation, ticketNumber, ticketId}) => {
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
                <ButtonFavorites item={item} ticketNumber={ticketNumber} ticketId={ticketId} />
                <Favorites item={item} />
            </View>
        </View>
    )
}

export default function FavoriteScreen({navigation}) {
    const ref = useRef()
    const ticketNumber = useRef(null)
    const ticketId = useRef(null)
    const {isScrollId} = useContext(CountContext)
    const {colorId} = useColor()
    const {scrollItemLayout} = useScroll()

    useEffect(() => {
        ref.current.scrollToOffset({
            offset: 390 * isScrollId,
            animated: true,
            index: isScrollId
        })
    }, [isScrollId])

    const TicketScrollFavorites = () => {
        const {getItemLayout} = useScroll()
        const ref = useRef()

        useEffect(() => {
            ref.current.scrollToOffset({
                index: isScrollId,
                offset: 390 * isScrollId,
                animated: true,
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
                        data={favorites}
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
                data={favorites}
                renderItem={({item}) => <Tickets item={item} ticketNumber={ticketNumber} ticketId={ticketId} navigation={navigation} /> }
                keyExtractor={item => item.id}
            />
          </SafeAreaView>
            ))}
       </CountContext.Consumer>
    )
}
