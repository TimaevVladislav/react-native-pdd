import React, {useContext, useEffect, useState} from 'react'
import {SafeAreaView, View, FlatList, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'


import {ButtonsExam} from "../components/Buttons"
import {Favorites} from "../components/layouts/Favorites"
import {Description} from "../components/layouts/Description"

import {CountContext} from "../store/provider/CountProvider"
import {colors as color} from "../store/data/colors"

import { useSwitcher } from "../store/questions"
import { useColor } from "../hooks/useColor"
import { useLayout } from "../hooks/useLayout"

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
                <ButtonsExam answers={item.answers} item={item} />
                <Favorites item={item} />
            </View>
            {/*<Description correct={item.correct_answer} tip={item.answer_tip} />*/}
        </View>
    )
}

export const ExamScreen = ({navigation}) => {
    const ref = useContext(CountContext)
    const [colors, setColor] = useState(color)
    const { uriTicket } = useSwitcher()
    const { scrollItemLayout } = useLayout()


    const TicketScrollButton = ({isScrollId}) => {
        const {colors, colorId, handlerColorChange} = useColor()
        const { getItemLayout } = useLayout()

        useEffect(() => {
            ref.current.scrollToOffset({
                isScrollId,
                offset: 390 * isScrollId,
                animated: true,
            })
        }, [isScrollId])

        const IdQuestion = ({answers, idQuestion, ticket_number}) => {
            return (
                <CountContext.Consumer>
                    {(({isScrollId, setIsScrollId}) => {
                        return (
                            <View style={stylesVirtual.container}>
                                <TouchableOpacity style={stylesVirtual.container}>
                                    <View style={[{backgroundColor: isScrollId === idQuestion ? "#FAF7F0" : colorId[idQuestion] }]}>
                                        <Text style={stylesVirtual.title} onPress={() => {
                                            setIsScrollId(idQuestion)
                                            navigation.setParams({id: idQuestion })
                                        }}>
                                            {idQuestion}
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
                <CountContext.Consumer>
                    {(({isScrollId}) => (
                        <SafeAreaView>
                            <FlatList
                                ref={ref}
                                horizontal
                                initialNumToRender={7}
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
            </>
        )
    }

    return (
        <CountContext.Consumer>
            {(({isScrollId, setIsScrollId}) => (
                <SafeAreaView>
                    <TicketScrollButton isScrollId={isScrollId} setIsScrollId={setIsScrollId} />
                    <FlatList
                        ref={ref}
                        horizontal
                        getItemLayout={scrollItemLayout}
                        initialNumToRender={7}
                        initialScrollIndex={isScrollId}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        data={uriTicket.ticket}
                        renderItem={({item}) => <Tickets item={item} />
                    }
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
