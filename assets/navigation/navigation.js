import React from "react"

import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from "../screens/HomeScreen"
import Profile from "../screens/Profile"
import Signs from "../screens/Signs"
import Markup from "../screens/Markup"
import {ExamScreen} from "../screens/ExamScreen"
import ResultScreen, {CloseOutline} from "../screens/ResultScreen"
import {Policies} from "../screens/SettingScreen"
import {FeedBack} from "../components/default/Feedback"


import Tickets from "../components/layouts/Tickets"
import Card from "../components/default/Card"
import SignsList from "../components/SignsList"
import MainButtons from "../components/MainButtons"
import {Search} from "../components/SearchComponent"
import {FavouriteScreen} from "../screens/FavouriteScreen"
import MistakeScreen from "../screens/MistakeScreen"
import Timer, {ArrowBack} from "../components/Timer"
import ExtraInformation, {Region} from "../components/ExtraInformation"
import Router from "./router"


const TicketsScreens = (Stack) => {
    return(
        <Stack.Group>
            <Stack.Screen name="Список билетов" component={Tickets} options={{title: "Билеты для экзамена"}} />
            <Stack.Screen name="Ошибки" component={MistakeScreen} />
        </Stack.Group>
    )
}
const HomeScreens = (Stack) => (
    <Stack.Group>
        <Stack.Screen name='Home' component={Router} options={{headerShown: false}} />
        <Stack.Screen name="Главная" component={Home} />
        <Stack.Screen name="Правила дорожного движения" component={Profile} options={{title: "ПДД"}} />
        <Stack.Screen name="Дорожные знаки" component={Signs} />
        <Stack.Screen name="Дорожная разметка" component={Markup} />
        <Stack.Screen name="Билеты" component={MainButtons} />
        <Stack.Screen name="Дополнительная информация" component={ExtraInformation} />
        <Stack.Screen name="Коды регионов" component={Region} />
    </Stack.Group>
)
export default function Navigation () {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Group>
            {HomeScreens(Stack)}
            {TicketsScreens(Stack)}
            <Stack.Screen name="Карточка" component={Card} options={({route= {}}) => ({title: route.params.heading})} />
            <Stack.Screen name="Обратная связь" component={FeedBack} />
            <Stack.Screen name="Пользовательское соглашение" component={Policies} />
            <Stack.Screen
                name="Экзамен"
                component={ExamScreen}
                options={({ route= {}}) => {
                    return ({
                        headerLeft: () => {
                            if(route.params.id || route.params.id === 0){
                                return <ArrowBack />
                            }
                        },
                        headerRight: () => <Timer />,
                        title: `${route.params.name}` + ` вопрос ${route.params.id === undefined ? 1 : route.params.id}`,
                    })}}
            />
            <Stack.Screen name="Избранное" component={FavouriteScreen} options={({route}) => ({title: route.params.favorite === undefined ? 1 : route.params.favorite})} />
            <Stack.Screen name="Результат" component={ResultScreen}
                options={({navigation}) => ({ headerLeft: () => <CloseOutline navigation={navigation} /> })}
            />
            <Stack.Screen
                name="Signs"
                options={({ route, navigation }) => ({
                    headerTitleAlign: "center",
                    headerTitle: () => <Search /> })}>
                {(props) => <SignsList {...props} />}
            </Stack.Screen>
        </Stack.Group>
    )
}
