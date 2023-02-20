import {Share} from "react-native"
import {DrawerItem} from "@react-navigation/drawer"
import Ionicons from "@expo/vector-icons/Ionicons"
import React from "react"

export const ShareButton = () => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'React Native | A framework for building native apps using React',
            })
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
            alert(error.message)
        }
    }

    return (
        <DrawerItem
            icon={({size, focused}) => (<Ionicons name="share-social-outline" size={size} color={focused ? '#7cc' : '#ccc'}/>)}
            labelStyle={{color: "black"}}
            label="Поделиться"
            onPress={onShare}
        />
    )
}
