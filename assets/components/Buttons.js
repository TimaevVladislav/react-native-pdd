import React, {useContext, useState} from "react"
import {Text, TouchableOpacity, View} from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import {Share} from "react-native"
import {styleTicket} from "../screens/ExamScreen"

import {DrawerItem} from "@react-navigation/drawer"
import {useColor} from "../hooks/useColor"
import {useScroll} from "../hooks/useScroll"

export const ButtonsExam = ({answers}) => {

    const {index} = useScroll()
    const [isDisabled, setIsDisabled] = useState(false)
    const {handlerColorChange, colors} = useColor()

    return (
        answers.map((answer, i) =>  (
                <View style={styleTicket.container}>
                    <TouchableOpacity
                        key={i}
                        disabled={isDisabled}
                        onPress={() => {setIsDisabled(true), handlerColorChange(answer, i)}}
                        style={[{backgroundColor: colors[i] }, styleTicket.item]}>
                        <Text style={styleTicket.itemText}>
                            {`${i + 1}.  ${answer.answer_text}`}
                        </Text>
                    </TouchableOpacity>
                </View>
        ))
    )
}
export const ButtonFavorites = ({answers}) => {
    const {handlerColorChange, colors} = useColor()
    const [isDisabled, setIsDisabled] = useState(false)

    return (
        answers.map((answer, i) =>  (
            <View style={styleTicket.container} >
                <TouchableOpacity
                    key={i}
                    disabled={isDisabled}
                    onPress={() => {setIsDisabled(true), handlerColorChange(answer, i)}}
                    style={[{backgroundColor: colors[i] }, styleTicket.item]}>
                    <Text style={styleTicket.itemText}>
                        {`${i + 1}.  ${answer.answer_text}`}
                    </Text>
                </TouchableOpacity>
            </View>
        ))
    )
}


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

