import React, {useRef, useState, useEffect} from "react"
import {SafeAreaView, View, FlatList, Text, Image, TouchableOpacity} from "react-native"

import {stylesVirtual, styleTicket} from "./ExamScreen"
import {colors as color} from "../store/data/colors"
import {favorites} from "../store/questions/A_B/tickets/favorites.js"

import {Favorites} from "../components/layouts/Favorites"
import {ButtonFavorites} from "../components/Buttons"
import {useColor} from "../hooks/useColor"
import {useScroll} from "../hooks/useScroll"
import {CountContext} from "../context/counter"

const Tickets = ({item}) => {
    return (
        <View>
            <View style={styleTicket.container}>
                <Image source={item.image} style={styleTicket.img} />
            </View>
            <View>
                <Text style={styleTicket.title}>
                    {item.question}
                </Text>
                <ButtonFavorites answers={item.answers} />
                <Favorites item={item} />
            </View>
        </View>
    )
}

export default function FavoriteScreen({navigation}) {
    const ref = useRef(null)
    const [colors, setColor] = useState(color)
    const { scrollItemLayout } = useScroll()

    const TicketScrollFavorites = ({isScrollId}) => {
        const {colors, colorId} = useColor()
        const { getItemLayout } = useScroll()

        useEffect(() => {
            ref.current.scrollToOffset({
                index: isScrollId,
                offset: 390 * isScrollId,
                animated: true,
            })
        }, [isScrollId])

        const IdQuestion = ({answers, idQuestion, ticket_number}) => {
            return (
                <CountContext.Consumer>
                    {(({isScrollId, setIsScrollId, setTicketId, ticketId}) => {
                        return (
                            <View style={stylesVirtual.container}>
                                <TouchableOpacity style={stylesVirtual.container}>
                                    <View style={[{backgroundColor: isScrollId === idQuestion ? "#FAF7F0" : colorId[idQuestion] }]}>
                                        <Text style={stylesVirtual.title} onPress={() => {
                                            setIsScrollId(idQuestion)
                                            setTicketId(ticket_number)
                                            navigation.setOptions({title: `Билет ${ticketId} вопрос ${idQuestion + 1}`})
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
        }

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
                        initialNumToRender={5}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            </>
        )
    }


    return (
        <CountContext.Consumer>
            {(({isScrollId, setIsScrollId}) => (
          <SafeAreaView>
            <TicketScrollFavorites isScrollId={isScrollId} setIsScrollId={setIsScrollId} />
            <FlatList
                ref={ref}
                horizontal
                getItemLayout={scrollItemLayout}
                initialNumToRender={5}
                initialScrollIndex={isScrollId}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                data={favorites}
                renderItem={({item}) => <Tickets item={item} colors={colors} /> }
                keyExtractor={item => item.id}
            />
          </SafeAreaView>
            ))}
       </CountContext.Consumer>
    )
}
