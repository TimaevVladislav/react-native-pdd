import React from "react"
import {StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from "react-native"

import items from "../store/temp/regions.json"
import {styles} from "./FloatList";
import {getNavigate} from "./MainButtons"


export default function ExtraInformation({navigation}) {
    return (
        <View>
           <TouchableOpacity onPress={() => getNavigate(navigation, "Коды регионов")}>
               <View style={style.item}>
                   <Text>Коды регионов</Text>
               </View>
           </TouchableOpacity>
           {/*<TouchableOpacity>*/}
           {/*     <View style={style.item}>*/}
           {/*         <Text>Действия при ДТП</Text>*/}
           {/*     </View>*/}
           {/* </TouchableOpacity>*/}
        </View>
    )
};

export const Region = () => (
    <View style={{flex: 1}}>
        <FloatList />
    </View>
)

function FloatList() {

    const getItem = (data, index) => {
        return data[index]
    };
    const Item = (item) => (
        <View style={styles.item}>
            <Text style={styles.titles}>
                {item.title}
            </Text>
        </View>
    );

    return (
        <VirtualizedList
            data={items}
            initialNumToRender={3}
            renderItem={({ item }) => <Item title={item.title} key={item.id} />}
            keyExtractor={item => item.key}
            getItemCount={data => data.length}
            getItem={getItem}
        />
    )
}

const style = StyleSheet.create({
    item:{
        fontSize: 20,
        margin: 10,
        backgroundColor: "#fff",
        padding: 5,
        height: 100,
        borderRadius: 5
    }
})
