import React from 'react'
import {SafeAreaView, StyleSheet, Button, TouchableHighlight, VirtualizedList} from 'react-native'




const DATA = [];

const getItem = (data, index) => ({
    id: index,
    title: index + 1
});

const getItemCount = (data) => 20;


const Item = ({ title, id }) => (
   <TouchableHighlight style={styles.container}>
           <Button style={styles.title} title={id} color="grey" />
   </TouchableHighlight>
);

export default function VirtualList() {
    return (
        <SafeAreaView>
            <VirtualizedList
                horizontal
                data={DATA}
                initialNumToRender={4}
                renderItem={({ item }) => <Item title={item.title} id={item.id} />}
                keyExtractor={item => item.key}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        height: 5550,
        width: 555,
    },
});
