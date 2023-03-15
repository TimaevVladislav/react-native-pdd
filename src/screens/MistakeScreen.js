import React, {useRef, useState, useEffect} from "react"
import {SafeAreaView, View, FlatList, Text, Image, TouchableOpacity} from "react-native"


import {stylesVirtual, styleTicket} from "./ExamScreen"
import {colors as color} from "../store/data/colors"
import {mistakes} from "../store/questions/A_B/tickets/mistakes"

import {Description} from "../components/layouts/Description"
import {Favorites} from "../components/layouts/Favorites"
import {ButtonsExam} from "../components/Buttons"
import {useColor} from "../hooks/useColor"
import {useScroll} from "../hooks/useScroll"


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
                <Description correct={item.correct_answer} tip={item.answer_tip} />
            </View>
        </View>
    )
}

export default function MistakeScreen({navigation}) {

    const ref = useRef(null)
    const [isScrollId, setIsScrollId] = useState(0)
    const [colors, setColor] = useState(color)
    const { scrollItemLayout } = useScroll()

    useEffect(() => {
        ref.current.scrollToOffset({
            index: isScrollId,
            offset: 390 * isScrollId,
            animated: true,
        })
    }, [isScrollId])


    const TicketScrollFavorites = () => {
        const {colors, colorId} = useColor()
        const { getItemLayout } = useScroll()

        const IdQuestion = ({answers, idQuestion, ticket_number}) => {
            return (
                <View style={stylesVirtual.container}>
                    <TouchableOpacity style={stylesVirtual.container}>
                        <View style={[{backgroundColor: isScrollId === idQuestion ? "#FAF7F0" : colorId[idQuestion] }]}>
                            <Text style={stylesVirtual.title} onPress={() => {
                                setIsScrollId(idQuestion)
                                navigation.setParams({favorite: 13})
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
                        data={mistakes}
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
                data={mistakes}
                renderItem={({item}) => <Tickets item={item} colors={colors} /> }
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}
