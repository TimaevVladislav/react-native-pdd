import React from "react"
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer'


import Ionicons from '@expo/vector-icons/Ionicons'
import {ThemeContext} from "../store/provider/ThemeProvider"
import {DARK_COLORS, LIGHT_COLORS} from "../store/temp/data/colors"

import Home from "../screens/Home"
import Settings from "../screens/Settings"
import WebViewComponent from "../components/WebViewComponent"
import {LogoDrawer} from "../components/ShareButton"


export default function Router({navigation}) {
    const Drawer = createDrawerNavigator()
    return (
        <ThemeContext.Consumer>
            {(({isDark}) => (
                <Drawer.Navigator
                    initialRouteName="Главная"
                    drawerContent={(props) => (
                        <DrawerContentScrollView {...props}>
                            {/*<LogoDrawer />*/}
                            <DrawerItemList {...props} />
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
                    {DrawerRouter(Drawer)}
                </Drawer.Navigator>
            ))}
        </ThemeContext.Consumer>
    )
}


const DrawerRouter = (Drawer) => (
    <Drawer.Group>
        <Drawer.Screen
            name="Главная"
            component={Home}
            options= {{drawerIcon: ({focused, size}) => (<Ionicons name="cube-outline" size={size} color={focused ? '#7cc' : '#ccc'} />),}}
        />
        <Drawer.Screen
            name="Проверка штрафов"
            component={WebViewComponent}
            options= {{drawerIcon: ({focused, size}) => (<Ionicons name="checkmark-done-circle-outline" size={size} color={focused ? '#7cc' : '#ccc'} />), }}
        />
        <Drawer.Screen
            name="Настройки"
            component={Settings}
            options= {{drawerIcon: ({focused, size}) => (<Ionicons name="settings-outline" size={size} color={focused ? '#7cc' : '#ccc'} />),}}
        />
    </Drawer.Group>
)