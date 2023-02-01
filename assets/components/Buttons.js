import React, {useState} from "react"
import {Text, TouchableOpacity, View} from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import {styleTicket} from "../screens/ExamScreen"

import {DrawerItem} from "@react-navigation/drawer"
import {Share} from "react-native"
import {useColor} from "../store/hooks/useColor";

export const ButtonsExam = ({answers, item}) => {

    const {handlerColorChange, colors} = useColor()
    const [isDisabled, setIsDisabled] = useState(false)
    // const [colors, setColor] = useState(["#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD"])

    // const handlerColorChange = (answer, buttonId) => {
    //     if (!answer.is_correct) {
    //         setColor(prevState => prevState.map((color, id) => id === buttonId ? "red" : prevState))
    //     } else {
    //         setColor(prevState => prevState.map((color, id) => id === buttonId ? "green" : prevState))
    //     }
    // }


    return (
        answers.map((answer, i) =>  (
            <View style={styleTicket.container} >
                <TouchableOpacity
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

