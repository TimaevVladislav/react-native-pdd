import React from 'react'
import {DARK_COLORS, LIGHT_COLORS} from "../store/colors"
import {ThemeContext} from "../store/provider/ThemeProvider"
import {items} from "../store/item"

import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'


export default function Home({navigation}) {

    const RenderItem = ({item}) => {
        return (
            <ThemeContext.Consumer>
                {(({isDark, colors}) => (
                    <View style={[styles.container, {backgroundColor: isDark ? DARK_COLORS.layout : LIGHT_COLORS.layout}]} >
                        <Text onPress={() => {navigation.navigate(item.navigator, { iconId: item.key })}} style={[styles.titleStyle, {color: colors.textColor}]}>
                            {item.title}
                        </Text>
                        <TouchableOpacity onPress={() => {navigation.navigate(item.navigator, { iconId: item.key })}}>
                            <View style={styles.containerBorder}>
                                <Image
                                    style={styles.imageStyle}
                                    source={item.image.uri}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ThemeContext.Consumer>
        );
    };

    return (
        <AppIntroSlider
            data={items}
            renderItem={RenderItem}
            showSkipButton={false}
            showNextButton={false}
            showDoneButton={false}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        paddingBottom: 50
    },
    containerBorder: {
        width: 220,
        height: 220,
        borderRadius: 500,
        backgroundColor: "#3AB4F2",
        alignItems: "center",
        justifyContent: "center"
    },
    imageStyle: {
        width: 160,
        height: 160,
        borderRadius: 500,
        alignItems: "center",
        justifyContent: "center"
    },
    titleStyle: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        paddingVertical: 30,
    },
})
