import React, {useState} from "react"
import {Text, TouchableOpacity, View} from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import {styleTicket} from "../../screens/Exam"
export const Favorites = () => {
    const [favorite, setFavorite] = useState(true)

    return (
        <View style={styleTicket.container}>
            {favorite ?
                <TouchableOpacity onPress={() => setFavorite(false) }>
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
                <TouchableOpacity onPress={() => setFavorite(true) }>
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
}