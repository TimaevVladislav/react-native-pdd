import React from "react"
import {View, Text, StyleSheet, Button, TouchableOpacity} from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"

export default function ResultScreen ({navigation, route}) {
    return (
        <View style={style.container}>
            <View>
                <Text style={[style.heading]}>
                    {route.params.results === 0 ? "Экзамен сдан" : "Экзамен не сдан"}
                </Text>
            </View>
            <Text>{`${route.params.results} ошибок, 20 вопросов`}</Text>
            <View style={style.btnContainer}>
                <Button
                    title="Мои ошибки"
                    color="red"
                    onPress={ () => navigation.navigate("Ошибки")}
                />
                <Button
                    title="Пройти ещё раз"
                    onPress={() => { navigation.goBack(), route.params.initialIndex(0) }}
                />
            </View>
        </View>
    )
}


export const CloseOutline = ({navigation}) => (
    <View style={{marginRight: 20}}>
        <TouchableOpacity onPress={() => { navigation.reset(0) }}>
            <Ionicons name="close-outline" size={35} color="white" />
        </TouchableOpacity>
    </View>
)


const style = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold"
    },
    btnContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 30
    }
})
