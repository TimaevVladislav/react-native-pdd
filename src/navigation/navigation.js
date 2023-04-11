import React from "react"

import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from "../screens/HomeScreen"
import Profile from "../screens/Profile"
import Signs from "../screens/Signs"
import Markup from "../screens/Markup"
import {ExamScreen} from "../screens/ExamScreen"
import ResultExamScreen from "../screens/ResultExamScreen"
import {FeedBack} from "../components/default/Feedback"
import Tickets from "../components/layouts/Tickets"
import Card from "../components/default/Card"
import SignsList from "../components/SignsList"
import MenuButtons from "../components/default/MenuButtons"
import {Search} from "../components/SearchComponent"
import FavouriteScreen from "../screens/FavouriteScreen"
import MistakeScreen from "../screens/MistakeScreen"
import Timer, {ArrowBack} from "../components/Timer"
import ExtraInformation, {Region} from "../components/ExtraInformation"
import Router from "./router"

export default function Navigation () {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Group>
            <Stack.Screen name='Home' component={Router} options={{headerShown: false}} />
            <Stack.Screen name="Главная" component={Home} />
            <Stack.Screen name="Правила дорожного движения" component={Profile} options={{title: "ПДД"}} />
            <Stack.Screen name="Дорожные знаки" component={Signs} />
            <Stack.Screen name="Дорожная разметка" component={Markup} />
            <Stack.Screen name="Билеты" component={MenuButtons} />
            <Stack.Screen name="Дополнительная информация" component={ExtraInformation} />
            <Stack.Screen name="Коды регионов" component={Region} />
            <Stack.Screen name="Карточка" component={Card} />
            <Stack.Screen name="Обратная связь" component={FeedBack} />
            <Stack.Screen name="Список билетов" component={Tickets} />
            <Stack.Screen name="Экзамен" component={ExamScreen}
                options={() => {
                    return ({
                        headerLeft: () => <ArrowBack />,
                        headerRight: () => <Timer />
                    })}}
            />
            <Stack.Screen name="Избранное" component={FavouriteScreen} />
            <Stack.Screen name="Ошибки" component={MistakeScreen} />
            <Stack.Screen name="Результаты" component={ResultExamScreen} />
            <Stack.Screen name="Результат избранное" component={ResultExamScreen} />
            <Stack.Screen name="Результат ошибки" component={ResultExamScreen} />
            <Stack.Screen
                name="Signs"
                options={() => ({
                    headerTitleAlign: "center",
                    headerTitle: () => <Search /> })}>
                {(props) => <SignsList {...props} />}
            </Stack.Screen>
        </Stack.Group>
    )
}
