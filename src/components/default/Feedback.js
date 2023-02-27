import React, {useState} from "react"
import {SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native"

export const FeedBack = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    return (
        <SafeAreaView style={stylesForm.container}>
            <View>
                <View style={stylesForm.inputRow}>
                    <Text style={{ fontSize: 16}}>E-mail:</Text>
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
        </SafeAreaView>
    )
}

const stylesForm = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    formsContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
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
        height: 100,
        alignItems: "center",
        alignContent: "center",
        backgroundColor: '#e8e8e8'
    },
    input: {
        padding: 10,
        width: 350
    },
})
