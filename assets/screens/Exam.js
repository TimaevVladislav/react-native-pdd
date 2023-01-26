import React, {useEffect} from 'react'

import {useLayout} from "../store/hooks/useLayout"
import {useScroll} from "../store/hooks/useScroll"
import {useSwitcher} from "../store/questions"

import {SafeAreaView, View, FlatList, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'

import {ButtonsExam} from "../components/Buttons"
import {Favorites} from "../components/layouts/Favorites"
import {CorrectAnswer} from "../components/layouts/CorrectAnswers"

import numberQuestion from "../store/temp/store.json"

import {DisableContext, DisableProvider} from "../context/disabled"

const Tickets = ({item, result}) => {
    return (
       <DisableProvider>
           <DisableContext.Consumer>
               {(({isDisabled}) => (
                   <View>
                       <View style={styleTicket.container}>
                           <Image source={{uri: item.image}} style={styleTicket.img} />
                       </View>
                       <View>
                           <Text style={styleTicket.title}>
                               {item.question}
                           </Text>
                           <ButtonsExam item={item} answers={item.answers} result={result} />
                           <Favorites />
                       </View>
                       { isDisabled ? <CorrectAnswer correct={item.correct_answer} tip={item.answer_tip} /> : null }
                   </View>
               ))}
           </DisableContext.Consumer>
       </DisableProvider>
    )
}



export const Exam = () => {
    const { scrollItemLayout } = useLayout()
    const { handlerCountResults, index, ref, route, setIndex, navigation } = useScroll()

    const { uriTicket } = useSwitcher()

    useEffect(() => {
        ref.current.scrollToOffset({
            index,
            offset: 390 * index,
            animated: true,
        })
        navigation.setParams({scrollIndex: index, initialIndex: setIndex})
    }, [index])

    const IndexRender = ({index, ref, setIndex}) => {
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
                    data={numberQuestion.id[route.params.key]}
                    renderItem={({item}) => <Index indexRender={item.key} /> }
                    initialNumToRender={5}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        )
    }

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
