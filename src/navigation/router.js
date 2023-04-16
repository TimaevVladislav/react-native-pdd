import React from "react"
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import Ionicons from '@expo/vector-icons/Ionicons'
import {ThemeContext} from "../context/theme"
import {DARK_COLORS, LIGHT_COLORS} from "../store/dependencies/colors"

import Home from "../screens/HomeScreen"
import SettingScreen from "../screens/SettingScreen"
import ShareButton from "../components/default/ShareButton"



export default function Router() {
    const Drawer = createDrawerNavigator()
    return (
        <ThemeContext.Consumer>
            {(({isDark}) => (
                <Drawer.Navigator
                    initialRouteName="Главная"
                    drawerContent={(props) => (
                        <DrawerContentScrollView {...props}>
                            <DrawerItemList {...props} />
                            <ShareButton />
                        </DrawerContentScrollView>
                    )}
                    drawerType="front"
                    screenOptions={{
                        drawerLabelStyle: {color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor},
                        drawerStyle: {
                        backgroundColor: isDark ? DARK_COLORS.layout : LIGHT_COLORS.layout},
                        headerStyle: {
                        backgroundColor: isDark ? DARK_COLORS.layout : "#0d6efd"},
                        headerTintColor: '#fff',
                    }}>
                    <Drawer.Screen
                        name="Главная"
                        component={Home}
                        options= {{drawerIcon: ({focused, size}) => (<Ionicons name="cube-outline" size={size} color={focused ? '#7cc' : '#ccc'} />)}}
                    />
                    <Drawer.Screen
                        name="Настройки"
                        component={SettingScreen}
                        options= {{drawerIcon: ({focused, size}) => (<Ionicons name="settings-outline" size={size} color={focused ? '#7cc' : '#ccc'} />)}}
                    />
                </Drawer.Navigator>
            ))}
        </ThemeContext.Consumer>
    )
}
