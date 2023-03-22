import React, {useContext, useEffect, useRef} from 'react'
import {SafeAreaView, View, FlatList, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'

import {ButtonsExam} from "../components/Buttons"
import {Favorites} from "../components/layouts/Favorites"
import {CountContext} from "../context/counter"

import {useSwitcher} from "../store/questions"
import {useColor} from "../hooks/useColor"
import {useLayout} from "../hooks/useLayout"
import {useRoute} from "@react-navigation/native"

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
                <ButtonsExam answers={item.answers} item={item} ticket_number={item.ticket_number} />
                <Favorites item={item} />
            </View>
        </View>
    )
}

export function ExamScreen({navigation}) {
    const ref = useRef()
    const {isScrollId} = useContext(CountContext)
    const route = useRoute()
    const {uriTicket} = useSwitcher()
    const {scrollItemLayout} = useLayout()

    navigation.setOptions({title: `Билет ${route.params.key} вопрос ${isScrollId + 1}`})

    useEffect(() => {
        ref.current.scrollToOffset({
            offset: 390 * isScrollId,
            animated: true,
            index: isScrollId
        })
    }, [isScrollId])

    const TicketScrollButton = () => {
        const {getItemLayout} = useLayout()
        const {colorId} = useColor()
        const ref = useRef()

        useEffect(() => {
            ref.current.scrollToIndex({
                offset: 390 * isScrollId,
                animated: true,
                index: isScrollId
            })
        }, [isScrollId])


        const IdQuestion = ({idQuestion}) => (
            <CountContext.Consumer>
                {(({isScrollId, setIsScrollId}) => (
                    <View style={stylesVirtual.container}>
                        <TouchableOpacity style={stylesVirtual.container}>
                            <View style={[{backgroundColor: isScrollId === idQuestion ? "#FAF7F0" : colorId.current[idQuestion] }]}>
                                <Text style={stylesVirtual.title} onPress={() => {
                                    setIsScrollId(idQuestion)
                                }}>
                                    {idQuestion + 1}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </CountContext.Consumer>
        )

        return (
                <CountContext.Consumer>
                    {(({isScrollId}) => (
                        <SafeAreaView>
                            <FlatList
                                ref={ref}
                                horizontal
                                initialNumToRender={20}
                                initialScrollIndex={isScrollId}
                                getItemLayout={getItemLayout}
                                data={uriTicket.ticket}
                                renderItem={({item}) => <IdQuestion answers={item.answers} idQuestion={item.ticket_question} ticket_number={item.ticket_number} /> }
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={item => item.id}
                            />
                        </SafeAreaView>
                    ))}
                </CountContext.Consumer>
        )
    }

    return (
        <CountContext.Consumer>
            {(({isScrollId}) => (
                <SafeAreaView>
                    <TicketScrollButton />
                    <FlatList
                        ref={ref}
                        horizontal
                        getItemLayout={scrollItemLayout}
                        initialNumToRender={20}
                        initialScrollIndex={isScrollId}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        data={uriTicket.ticket}
                        renderItem={({item}) => <Tickets item={item} /> }
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            ))}
        </CountContext.Consumer>
    )
}


export const stylesVirtual = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 1,
        marginTop: 2,
        marginBottom: 2
    },
    title: {
        textAlign: "center",
        padding: 5,
        opacity: 0.5,
        height: 40,
        width: 40,
        fontSize: 20,
    },
})

export const styleTicket = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    item:{
        opacity: 0.4,
        width: 350,
        justifyContent: 'center',
        marginVertical: 4,
        padding: 10,
    },
    img: {
        width: 380,
        height: 150
    },
    itemText:{
        fontSize: 13,
        fontWeight: "normal",
    },
    title:{
        width: 390,
        padding: 15,
        fontSize: 15,
        fontWeight: "bold",
    },
    heading: {
        fontSize: 16.5,
        fontWeight: "normal",
        color: "#3AB4F2",
        paddingHorizontal: 10
    },
    buttonSave: {
        flexDirection: "row",
        paddingRight: 130,
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
    }
})
