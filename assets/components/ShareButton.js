import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import {SvgUri} from "react-native-svg"

import {Share, View, StyleSheet} from 'react-native'
import {DrawerItem} from '@react-navigation/drawer'



const ShareButton = () => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <DrawerItem
        icon={({size, focused}) => (<Ionicons name="share-social-outline" size={size} color={focused ? '#7cc' : '#ccc'}/>)}
        labelStyle={{color: "black"}}
        label="Поделиться"
        onPress={onShare}
        />
    )
};

export default ShareButton;


export const LogoDrawer = () => (
    <View style={style.container}>
        <SvgUri uri={"https://s.auto.drom.ru/i24227/pubs/26197/63036/2929346.svg"} />
    </View>
)

const style = StyleSheet.create({
    container:{
      padding: 20,
      flexDirection: "row",
      justifyContent: "center"
    }
})