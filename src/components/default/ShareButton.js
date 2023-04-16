import {Share} from "react-native"
import {DrawerItem} from "@react-navigation/drawer"
import Ionicons from "@expo/vector-icons/Ionicons"
import React from "react"
import {ThemeContext} from "../../context/theme"
import {DARK_COLORS, LIGHT_COLORS} from "../../store/dependencies/colors"

export default function ShareButton() {
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
        <ThemeContext.Consumer>
            {(({isDark}) => (
                <DrawerItem icon={({size, focused}) => (<Ionicons name="share-social-outline" size={size} color={focused ? '#7cc' : '#ccc'}/>)}
                    labelStyle={{color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}}
                    label="Поделиться"
                    onPress={onShare}
                />
            ))}
        </ThemeContext.Consumer>
    )
}
