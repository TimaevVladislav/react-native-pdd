import React, {useState, useContext} from "react"
import {Text, TouchableOpacity, View} from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import {styleTicket} from "../../screens/ExamScreen"
import {favorites} from "../../store/questions/A_B/tickets/favorites"
import {CountContext} from "../../context/counter"
import {useNavigation} from "@react-navigation/native"
import {useColor} from "../../hooks/useColor"

export const Favorites = ({item}) => {
    const [isFavorite, setIsFavorite] = useState(item.favorite)
    const navigation = useNavigation()
    const {colorId} = useColor()
    const {isScrollId} = useContext(CountContext)

    const addTicketHandler = (ticket) => {
        setIsFavorite(item.favorite = true)
        !favorites.includes(ticket) && favorites.push(ticket)
    }

    const deleteTicketHandler = () => {
        navigation.addListener("beforeRemove", () => {
            favorites.splice(isScrollId, 1 || 0)
            colorId.current.map((color, id) => colorId.current[id] = "#DDDDDD")
        })
        setIsFavorite(item.favorite = false)
    }

    return (
        <View style={styleTicket.container}>
            { isFavorite ?
                <TouchableOpacity  onPress={() => deleteTicketHandler(item)}>
                    <View style={[styleTicket.buttonSave]}>
                        <View>
                            <Ionicons name="ios-star" size={23} color="#3AB4F2" />
                        </View>
                        <Text style={styleTicket.heading}>
                            Удалить из избранного
                        </Text>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => addTicketHandler(item)}>
                    <View style={[styleTicket.buttonSave]}>
                        <View>
                            <Ionicons name="star-outline" size={23} color="#3AB4F2" />
                        </View>
                        <Text style={styleTicket.heading}>
                            Добавить в избранное
                        </Text>
                    </View>
                </TouchableOpacity>
            }
        </View>
    )
}

