import React, {useRef, useEffect, useContext} from "react"
import {SafeAreaView, View, FlatList, Text, Image, TouchableOpacity} from "react-native"

import {stylesVirtual, styleTicket} from "./ExamScreen"
import {favorites} from "../store/questions/A_B/tickets/favorites.js"

import {Favorites} from "../components/layouts/Favorites"
import {ButtonFavorites} from "../components/Buttons"
import {useColor} from "../hooks/useColor"
import {useScroll} from "../hooks/useScroll"
import {CountContext} from "../context/counter"

const Tickets = ({item, ticketNumber, ticketId}) => {
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

    navigation.setOptions({title: `Билет ${ticketNumber.current} вопрос ${ticketId.current + 1}`})

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

        const IdQuestion = ({idQuestion, ticket_number}) => (
            <CountContext.Consumer>
                {(({isScrollId, setIsScrollId}) => {
                    return (
                        <View style={stylesVirtual.container}>
                            <TouchableOpacity style={stylesVirtual.container}>
                                <View style={[{backgroundColor: isScrollId === idQuestion ? "#FAF7F0" : colorId.current[idQuestion] }]}>
                                    <Text style={stylesVirtual.title} onPress={() => {
                                        setIsScrollId(idQuestion)
                                        ticketNumber.current = ticket_number
                                        ticketId.current = idQuestion
                                    }}>
                                        {idQuestion + 1}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </CountContext.Consumer>
        )

        return (
            <>
                <SafeAreaView>
                    <FlatList
                        ref={ref}
                        horizontal
                        initialScrollIndex={isScrollId}
                        getItemLayout={getItemLayout}
                        data={favorites}
                        renderItem={({item}) => <IdQuestion answers={item.answers} idQuestion={item.ticket_question} ticket_number={item.ticket_number} /> }
                        initialNumToRender={20}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            </>
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
                renderItem={({item}) => <Tickets item={item} ticketNumber={ticketNumber} ticketId={ticketId} /> }
                keyExtractor={item => item.id}
            />
          </SafeAreaView>
            ))}
       </CountContext.Consumer>
    )
}
