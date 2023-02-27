import React from "react"
import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"

import {AlertComponent} from "./Alert"
import {favorites} from "../../store/questions/A_B/tickets/favorites"
import {mistakes} from "../../store/questions/A_B/tickets/mistakes"


export const getNavigate = (navigation, item) => {
    navigation.navigate(item)
}

export default function MenuButtons({navigation}) {
    return(
        <>
            <ButtonsMain navigation={navigation} />
            <Buttons navigation={navigation} />
        </>
    )
}

const Content = () => (
    <View style={style.containerContent}>
      <Text></Text>
    </View>
)

const ButtonsMain = ({navigation}) => (
    <View style={style.btnMain}>
        <TouchableOpacity onPress={() => getNavigate(navigation, "Список билетов")}>
            <View style={[style.item, {backgroundColor: "#0d6efd"}]}>
                <View>
                    <Text style={style.heading}>Билеты</Text>
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={[style.item, {backgroundColor: "#dc3545"}]}>
                <Text style={style.heading}>Экзамен</Text>
            </View>
        </TouchableOpacity>
    </View>
)

const Buttons = ({navigation}) => {

    const alertFavorite = {
        title: "Избранное",
        message: "Здесь появятся вопросы, которые ты отметишь как избранные",
        buttons: [{text: "Ок", style: "cancel"}]
    }

    const alertError = {
        title: "Ошибки",
        message: "Здесь появятся вопросы, которые нужно будет повторить :(",
        buttons: [{text: "Ок", style: "cancel"}]
    }

    return(
        <View style={style.container}>
            <TouchableOpacity onPress={() => mistakes.length > 0 ? navigation.navigate("Ошибки") : AlertComponent(alertError)}>
                <View style={style.item}>
                    <View>
                        <Ionicons name="alert-circle" size={25} color="#3AB4F2" />
                    </View>
                    <View>
                        <Text style={style.heading}>Ошибки</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => favorites.length > 0 ? navigation.navigate("Избранное") : AlertComponent(alertFavorite)}>
                <View style={style.item}>
                    <View>
                        <Ionicons name="ios-star" size={25} color="#3AB4F2" />
                    </View>
                    <Text style={style.heading}>Избранное</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const ButtonsBottom = () => (
    <View style={style.container}>
        <TouchableOpacity>
            <View style={style.item}>
                <View>
                    <Ionicons name="ios-star" size={25} color="#3AB4F2" />
                </View>
                <View>
                    <Text style={style.heading}></Text>
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getNavigate(navigation, "Главная")}>
            <View style={style.item}>
                <View>
                    <Ionicons name="ios-star" size={25} color="#dc3545" />
                </View>
                <Text style={style.heading}></Text>
            </View>
        </TouchableOpacity>
    </View>
)



const style = StyleSheet.create({
    container: {
        marginVertical: 1.5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    containerContent: {
       justifyContent: "center",
       alignItems: "center",
       borderWidth: 0.5,
       opacity: 0.4,
       borderRadius: 5,
       height: 250,
       margin: 15,
       marginVertical: 20
    },
    btnMain:{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    item: {
      backgroundColor: "#3AB4F2",
      opacity: 0.9,
      borderRadius: 5,
      marginHorizontal: 10,
      marginVertical: 5,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      height: 65,
      width: 170
    },
    heading: {
        fontSize: 18,
        fontWeight: "normal",
        color: "#000",
        paddingHorizontal: 10
    },
    btnContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 30
    }
})
