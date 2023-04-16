import React, {useEffect, useState} from "react"
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from "react-native"
import {useNavigation} from "@react-navigation/native"

const DATA = []

export default function Tickets() {
    const navigation = useNavigation()
    const getItem = (data, index) => ({id: Math.random().toString(12).substring(0), title: index + 1})
    const getItemCount = () => 40

    useEffect(() => {

    })

    const Item = ({title, index}) => (
        <TouchableOpacity key={index} onPress={() => navigation.navigate("Экзамен", {key: title})}>
            <View style={style.item}>
                <View style={style.indexItem}>
                    <Text style={style.title}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView>
            <VirtualizedList
                data={DATA}
                initialNumToRender={25}
                renderItem={({item, index}) => <Item key={item} title={item.title} index={index} />}
                keyExtractor={item => item.key}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </SafeAreaView>
    )
}


export const style = StyleSheet.create({
    item: {
        backgroundColor: '#a9a9a9',
        opacity: 0.4,
        height: 70,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },
    title: {
        fontSize: 32,
    },
    indexItem:{
        backgroundColor: "grey" ,
        height: 70,
        width: 70,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: -20
    }
})

