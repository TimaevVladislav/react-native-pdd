import React, {useEffect, useState} from 'react'
import {useLayout} from "../store/hooks/useLayout"
import {useScroll} from "../store/hooks/useScroll"

import {SafeAreaView, View, FlatList, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'

import img from "../store/images/A_B/0a8c64af8a46c7ceb8e9dbc0943bb56a.jpg"

import {ButtonsExam} from "../components/Buttons"
import {Favorites} from "../components/layouts/Favorites"
import {CorrectAnswer} from "../components/layouts/CorrectAnswers"


import {uriTicket} from "../store/questions/index"

const Tickets = ({item, result}) => {
    return (
        <View>
            <View style={styleTicket.container}>
                <Image source={{uri: item.image}} style={styleTicket.img} />
            </View>
            <View>
                <Text style={styleTicket.title}>
                    {item.question}
                </Text>
                <ButtonsExam answers={item.answers} result={result} />
                <Favorites />
            </View>
        </View>
    )
}

// <CorrectAnswer correct={item.correct_answer} tip={item.answer_tip} />

export const Exam = () => {
    const { scrollItemLayout } = useLayout()
    const { handlerCountResults, index, ref, route, setIndex, navigation } = useScroll()

    useEffect(() => {
        ref.current.scrollToOffset({
            index,
            offset: 390 * index,
            animated: true,
        })
        navigation.setParams({scrollIndex: index, initialIndex: setIndex})
    }, [index])

    const IndexRender = ({index, ref, route, setIndex}) => {
        const { getItemLayout } = useLayout()
        const Index = ({indexRender}) => (
            <View style={stylesVirtual.container}>
                <TouchableOpacity style={stylesVirtual.container}>
                    <View style={[{backgroundColor: index === indexRender ? "#FAF7F0" : "#DDDDDD" }]}>
                        <Text style={stylesVirtual.title} onPress={() => setIndex(indexRender) }>
                            {indexRender + 1}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )

        return (
            <SafeAreaView>
                <FlatList
                    horizontal
                    ref={ref}
                    initialScrollIndex={index}
                    getItemLayout={getItemLayout}
                    data={uriTicket}
                    renderItem={({item}) => <Index indexRender={item.key} /> }
                    initialNumToRender={5}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        )
    }

    // [`${route.params.key}`]
    return (
        <SafeAreaView>
               <IndexRender index={index} ref={ref} route={route} setIndex={setIndex} />
               <FlatList
                   ref={ref}
                   horizontal
                   getItemLayout={scrollItemLayout}
                   initialNumToRender={5}
                   initialScrollIndex={index}
                   scrollEnabled={false}
                   showsHorizontalScrollIndicator={false}
                   data={uriTicket}
                   renderItem={({item}) => <Tickets item={item} result={handlerCountResults} /> }
                   keyExtractor={item => item.id}
               />
           </SafeAreaView>
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
