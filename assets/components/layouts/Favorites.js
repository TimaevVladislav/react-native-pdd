import React, {useEffect, useState} from "react"
import { Text, TouchableOpacity, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { styleTicket } from "../../screens/ExamScreen"
import { favorites } from "../../store/questions/A_B/tickets/favorites"

export const Favorites = ({item}) => {

    const [isFavorite, setIsFavorite] = useState(false)
    const [favorite, setFavorite] = useState(favorites)

    const addTicketHandler = (ticket) => {
        setIsFavorite(true)
       favorite.push(ticket)
    }

    const deleteTicketHandler = (ticket) => {
        setIsFavorite(false)
        favorite.filter(item => item.ticket_question !== ticket.ticket_question)
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

