import React from 'react'
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from 'react-native'
import {useNavigation} from "@react-navigation/native"

const DATA = []

export default function Tickets() {

    const navigation = useNavigation()
    const getItem = (data, index) => ({
        id: Math.random().toString(12).substring(0),
        title: index + 1
    })

    const getItemCount = () => 40

    navigation.setOptions({title: "Билеты для экзамена"})

    const Item = (item) => (
        <TouchableOpacity onPress={() => navigation.navigate("Экзамен", {key: item.title})}>
            <View style={style.item}>
                <View style={style.indexItem}>
                    <Text style={style.title}>{item.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView>
            <VirtualizedList
                data={DATA}
                initialNumToRender={25}
                renderItem={({item}) => <Item title={item.title} id={item.key} />}
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

