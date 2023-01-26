import React from "react"
import {Text, TouchableOpacity, View} from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import {styleTicket} from "../screens/Exam"

import {DrawerItem} from "@react-navigation/drawer"
import {useColor} from "../store/hooks/useColor"
import {DisableContext, DisableProvider} from "../context/disabled"
import {Share} from "react-native"

export const ButtonsExam = ({answers, item}) => {
    const { handlerPressButton } = useColor()

    return (
        answers.map((answer, i) =>  (
           <DisableProvider>
               <DisableContext.Consumer>
                   {(({isDisabled, setIsDisabled}) => (
                       <View style={styleTicket.container} >
                           <TouchableOpacity
                               disabled={isDisabled}
                               onPress={() => {
                                   handlerPressButton(item, i)
                                   setIsDisabled(true)
                               }}
                               style={[{backgroundColor: "#DDDDDD" }, styleTicket.item]}>
                               <Text style={styleTicket.itemText}>
                                   {`${i + 1}.  ${answer.answer_text}`}
                               </Text>
                           </TouchableOpacity>
                       </View>
                   ))}
               </DisableContext.Consumer>
           </DisableProvider>
        ))
    )
}

export const ShareButton = () => {
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
            alert(error.message)
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
}

