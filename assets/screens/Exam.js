import React, {useEffect, useState} from 'react'
import {useLayout} from "../store/hooks/useLayout"
import {useScroll} from "../store/hooks/useScroll"
import * as FileSystem from "expo-file-system"


import {
    SafeAreaView,
    View,
    FlatList,
    Text, Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import {items} from "../store/temp/store.json"


import Ionicons from "@expo/vector-icons/Ionicons"

const Content = ({ img, item, buttonData, handlerResults }) => {
    //
    // const [isLoading, setLoading] = useState(true)
    // const [ticketsData, setTicketsData] = useState([])
    //
    // useEffect(() => {
    //     fetch('../store/temp/store.json')
    //         .then((response) => response.json())
    //         .then((json) => setTicketsData(json))
    //         .catch((error) => console.error(error))
    //         .finally(() => setLoading(false));
    // }, []);



    // fetch(`../store/questions/A_B/tickets/Билет 1.json`)
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch((e) => {
    //         console.log(e.message)
    //     })

    // const getTickets = () => {
    //     FileSystem.createDownloadResumable(
    //         "",
    //         "../store/questions/A_B/tickets/Билет 1.json",
    //         {},
    //         (data) => console.log(data.totalBytesExpectedToWrite)
    //     )
    // }
    //
    // try {
    //     FileSystem.readDirectoryAsync(
    //         "../store/questions/A_B/tickets/Билет 1.json"
    //     )
    //         .then(( data ) => {
    //             console.log('Finished downloading to ', data);
    //         })
    // } catch (error) {
    //     console.log(error);
    // }


        // .then((res) => {
            //     console.log(res);
            //     const d = JSON.parse(res);
            //     // this.setState({ content: res, fruitType: d.type });
            // })
            // .catch((err) => {
            //     console.log(err.message, err.code)
            // })

    const initialColors = [
        { id: 0, color: "#DDDDDD" },
        { id: 1, color: "#DDDDDD" },
        { id: 2, color: "#DDDDDD" },
        { id: 3, color: "#DDDDDD" }
    ]

    const [addFavorites, setIsFavorites] = useState(true)
    const [buttonColor, setButtonColor] = useState(initialColors)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handlerDisabled = () => setButtonDisabled(true)

    const handlerUpdateColor = (index) => {
        let newColor = buttonColor.map((button) => {
            if (index === button.id) {
                return { ...buttonColor, [button.color]: "red" }
            } else {
                return button
            }
        });
        setButtonColor(newColor)
    }
    const handlerChangeColor = (button, index) => {
        if(button[index] && button.correct) {
           handlerUpdateColor(index)
        } else {
           handlerUpdateColor(index)
        }
    }
    const handlerOnPress = (item, index) => {
        handlerDisabled(), handlerChangeColor(item, index), handlerResults(item)
    }
    const Button = () => (
        buttonData.map((item, i) =>  (
            <View style={styleTicket.container}>
                <TouchableOpacity
                    key={i}
                    disabled={buttonDisabled}
                    onPress={() => handlerOnPress(item, i)}
                    style={[{backgroundColor: buttonColor[i].color }, styleTicket.item]}>
                    <Text style={styleTicket.itemText}>
                        {`${i + 1}.  ${item[i]}`}
                    </Text>
                </TouchableOpacity>
            </View>
        ))
    )

    return (
        <View>
            <View style={styleTicket.container}>
                <Image source={{uri: img}} style={styleTicket.img} />
            </View>
            <View>
                <Text style={styleTicket.title}>
                    {item.question}
                </Text>
                <Button />
                <FavoritesButton
                    addFavorites={addFavorites}
                    setIsFavorites={setIsFavorites}
                />
            </View>
        </View>
    )
}

const FavoritesButton = ({ addFavorites, setIsFavorites }) => (
    <View style={styleTicket.container}>
        {addFavorites ?
            <TouchableOpacity onPress={() => setIsFavorites(false) }>
                <View style={[styleTicket.buttonSave]}>
                    <View>
                        <Ionicons name="star-outline" size={23} color="#3AB4F2" />
                    </View>
                    <Text style={styleTicket.heading}>
                        Добавить в избранное
                    </Text>
                </View>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => setIsFavorites(true) }>
                <View style={[styleTicket.buttonSave]}>
                    <View>
                        <Ionicons name="ios-star" size={23} color="#3AB4F2" />
                    </View>
                    <Text style={styleTicket.heading}>
                        Удалить из избранного
                    </Text>
                </View>
            </TouchableOpacity>
        }
    </View>
)

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
                    data={items[`${route.params.key}`]}
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
                   data={items[`${route.params.key}`]}
                   renderItem={({item}) => <Content img={item.img} question={item.question} key={item.key} item={item} buttonData={item.render} handlerResults={handlerCountResults} /> }
                   keyExtractor={item => item.id}
               />
           </SafeAreaView>
    )
}


const stylesVirtual = StyleSheet.create({
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

const styleTicket = StyleSheet.create({
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
