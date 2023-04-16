import React, {useState} from "react"
import {StyleSheet, Text, TextInput, View} from "react-native"

export const FeedbackScreen = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    return (
        <View>
            <View style={stylesForm.inputRow}>
                <Text style={stylesForm.title}>E-mail:</Text>
                <TextInput
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    placeholder={"Для обратной связи"}
                    style={stylesForm.input}
                />
            </View>
            <View style={stylesForm.textAreaRow}>
                <TextInput
                    value={message}
                    onChangeText={(message) => setMessage(message)}
                    placeholder={"Опишите свою проблему"}
                />
            </View>
        </View>
    )
}

const stylesForm = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    formsContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center"
    },
    title: {
        fontSize: 16
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        paddingLeft: 20,
        backgroundColor: '#e8e8e8'
    },
    textAreaRow: {
        flexDirection: "row",
        padding: 10,
        paddingLeft: 20,
        paddingBottom: 75,
        height: 150,
        alignItems: "center",
        alignContent: "center",
        backgroundColor: '#e8e8e8'
    },
    input: {
        padding: 10,
        width: 350
    }
})
