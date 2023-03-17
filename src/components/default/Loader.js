import React from 'react'
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'
import {ThemeContext} from "../../context/theme"


export const Loader = () => {
    return (
        <View style={[styles.container, styles.horizontal]}>
           <ActivityIndicator size="large" color="#0d6efd" />
       </View>
    )
}

export const ErrorMessage = () => (
    <ThemeContext.Consumer>
        {(({colors}) => (
            <View style={[styles.horizontal]}>
                <Text style={{color: colors.textColor}}>Ничего не найдено...</Text>
            </View>
        ))}
    </ThemeContext.Consumer>
)



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        marginTop: 70
    },
})

