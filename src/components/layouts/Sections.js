import React, {useState} from "react"
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from "react-native"

import {useNavigation, useRoute} from "@react-navigation/native"
import {ThemeContext} from "../../context/theme"
import {DARK_COLORS, LIGHT_COLORS} from "../../store/data/colors"
import {SearchContext} from "../../context/search"

const List = props => (
       <SearchContext.Consumer>
           {(({}) => (
               <ThemeContext.Consumer>
                   {(({isDark}) => (
                       <ScrollView>
                           <Sections data={props.data} />
                       </ScrollView>
                   ))}
               </ThemeContext.Consumer>
           ))}
       </SearchContext.Consumer>
)

export default List

function Sections(props) {
    const route = useRoute()
    const [data, setData] = useState(props.data);
    const navigation = useNavigation();
    const getItem = (data, index) => data[index]

    const Item = (item) => (
        <TouchableOpacity onPress={() => navigation.navigate("Signs", {
            name: item.title, id: item.id
        })}>
            <View style={[styles.item]}>
                <Text style={[styles.title]}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
            <VirtualizedList
                data={data}
                initialNumToRender={25}
                renderItem={({item}) => <Item title={item.title} id={item.key} />}
                keyExtractor={item => item.key}
                getItemCount={data => data.length}
                getItem={getItem}
            />
    )
}
export const styles = StyleSheet.create({
    itemImage: {
        height: 20,
        width: 20,
    },
    items: {
        backgroundColor: '#a9a9a9',
        opacity: 0.4,
        height: 80,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },
    item: {
        marginVertical: 0,
        marginHorizontal: 0,
        padding: 5,
    },
    titles: {
        fontSize: 16,
        margin: 10,
        borderRadius: 5
    },
    title: {
        fontSize: 20,
        backgroundColor: "#fff",
        padding: 5,
        height: 100,
        borderRadius: 5
    },
})
