import React from 'react'
import {SafeAreaView, StyleSheet} from "react-native"
import {WebView} from "react-native-webview"
import {Loader} from "./Loader"


export default function WebView() {
    return (
        <SafeAreaView style={style.container}>
            <WebView
                source={{ uri: 'https://portal.srs.kg/ru/service/eform/d1a29582-8014-4196-ac3b-956c4855f352' }}
                renderLoading={Loader}
                startInLoadingState={true}
            />
        </SafeAreaView>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        flexDirection: "row",
        justifyContent: "center"
    }
})