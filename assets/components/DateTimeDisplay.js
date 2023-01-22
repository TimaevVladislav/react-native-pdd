import React  from 'react'
import {View, Text, StyleSheet} from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import {CountContext, CountProvider} from "../store/provider/CountProvider"

const DateTimeDisplay = ({ min, seconds }) => {

    return (
       <CountProvider>
           <CountContext.Consumer>
               {(({stopIntervalHandle}) => (
                   <View style={style.container}>
                       <Text style={style.icon}>
                           <Ionicons name="ios-timer" size={24} color="white" />
                       </Text>
                       {stopIntervalHandle ? null : <Text style={style.title}>{min} : {seconds}</Text> }
                   </View>
               ))}
           </CountContext.Consumer>
       </CountProvider>
    );
};

export default DateTimeDisplay;

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    icon:{
        paddingTop: 2
    },
    title: {
        fontWeight: "normal",
        fontSize: 18,
        color: "#FFF"
    }
})