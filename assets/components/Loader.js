import React, {useState} from 'react'
import {
    ActivityIndicator,
    StyleSheet, Text,
    View
} from 'react-native'
const Message = (message) => <Text style={style.container}>{message}</Text>
export const Loader = ({heading}) => {
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState(false)
    const Heading = () => <Text style={style.container}>{heading}</Text>

    setTimeout(() => {
        setMessage(true)
        setLoading(false)
    }, 3000)

    return (
        <>
            {message ? Message("Ничего не найдено") : <Heading /> }
            {loading ?
                <View style={[styles.container, styles.horizontal]}>
                 <ActivityIndicator size="large" color="#0d6efd" />
                 </View>
                : <></>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
})

const style = StyleSheet.create({
    container:{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        padding: 20
    }
})