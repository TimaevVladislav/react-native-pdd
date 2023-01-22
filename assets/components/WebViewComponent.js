import React from 'react'
import {SafeAreaView, ActivityIndicator, StyleSheet} from "react-native"
import {WebView} from "react-native-webview"



const LoadingIndicator = () => {
    return <ActivityIndicator style={style.loading} color='#009b88' size='large' />
}

export default function WebViewComponent() {
    return (
        <>
            <SafeAreaView style={style.container}>
                <WebView
                    source={{ uri: 'https://portal.srs.kg/ru/service/eform/d1a29582-8014-4196-ac3b-956c4855f352' }}
                    renderLoading={LoadingIndicator}
                    startInLoadingState={true}
                />
            </SafeAreaView>
        </>
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