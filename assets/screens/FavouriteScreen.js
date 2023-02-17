import React, { useRef, useState, useEffect } from 'react'
import {SafeAreaView, View, FlatList, Text, Image, TouchableOpacity} from 'react-native'

import {useScroll} from "../hooks/useScroll"


import {Favorites} from "../components/layouts/Favorites"
import {CorrectAnswer} from "../components/layouts/CorrectAnswers"

import {stylesVirtual, styleTicket} from "./ExamScreen"
import {DisableContext, DisableProvider} from "../context/disabled"

import {colors as color} from "../store/temp/data/colors"
import { favorites } from "../store/questions/A_B/tickets/favorites.js"

import {ButtonFavorites} from "../components/Buttons"
import {useColor} from "../hooks/useColor"
import {useLayout} from "../hooks/useLayout"

const Tickets = ({item}) => {

    const [isFavorite, setIsFavorite] = useState(true)

    return (
        <DisableProvider>
            <DisableContext.Consumer>
                {(({isDisabled}) => (
                    <View>
                        <View style={styleTicket.container}>
                            <Image source={item.image} style={styleTicket.img} />
                        </View>
                        <View>
                            <Text style={styleTicket.title}>
                                {item.question}
                            </Text>
                            <ButtonFavorites answers={item.answers} />
                            <Favorites />
                        </View>
                        { isDisabled ? <CorrectAnswer correct={item.correct_answer} tip={item.answer_tip} /> : <></> }
                    </View>
                ))}
            </DisableContext.Consumer>
        </DisableProvider>
    )
}

export const FavouriteScreen = () => {

    const ref = useRef(null)

    const [colors, setColor] = useState(color)
    const { isScrollId, setIsScrollId, scrollItemLayout } = useScroll()

    useEffect(() => {
        ref.current.scrollToOffset({
            isScrollId,
            offset: 390 * isScrollId,
            animated: true,
        })
    }, [isScrollId])

    const handlerColor = (answer, buttonId) => {
        if (!answer.is_correct) {
            setColor(prevState => prevState.map((color, id) => id === buttonId ? "red" : prevState))
        } else {
            setColor(prevState => prevState.map((color, id) => id === buttonId ? "green" : prevState))
        }
    }

    const TicketScrollFavorites = ({data, setData}) => {

        const {colors, colorId} = useColor()
        const { getItemLayout } = useLayout()

        const IdQuestion = ({answers, idQuestion, ticket_number}) => {
            return (
                <View style={stylesVirtual.container}>
                    <TouchableOpacity style={stylesVirtual.container}>
                        <View style={[{backgroundColor: isScrollId === idQuestion ? "#FAF7F0" : colorId[idQuestion] }]}>
                            <Text style={stylesVirtual.title} onPress={() => {
                                setIsScrollId(idQuestion)
                            }}>
                                {idQuestion}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        <SafeAreaView>
            <TicketScrollFavorites />
            <FlatList
                ref={ref}
                horizontal
                getItemLayout={scrollItemLayout}
                initialNumToRender={5}
                initialScrollIndex={isScrollId}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={favorites}
                renderItem={({item}) => <Tickets item={item} colors={colors} handlerColor={handlerColor} /> }
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}
