import {StyleSheet, Text} from "react-native"

export const Message = (message) => {
    return(
        <Text style={style.container}>
            {message}
        </Text>
    )
}

const style = StyleSheet.create({
    container:{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        padding: 20
    }
})