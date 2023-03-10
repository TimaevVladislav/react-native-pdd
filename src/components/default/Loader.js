import React from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'


export const Loader = () => {
    return (
        <View style={[styles.container, styles.horizontal]}>
           <ActivityIndicator size="large" color="#0d6efd" />
       </View>
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

