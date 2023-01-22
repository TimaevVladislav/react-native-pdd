import {Alert} from "react-native"
import {useNavigation, useRoute} from "@react-navigation/native"
import {useTimer} from "./useTimer";
import {useEffect} from "react";


export const useAlert = () => {

    const navigation = useNavigation()
    const route = useRoute()

    const handlerExpired = () => (
        Alert.alert(
            "К сожалению, вы не прошли тестирование :(",
            `Правильных ответов: 0 из 20`,
            [
                {
                    text: "Пройти тест еще раз",
                    onPress: () => {
                        route.params.initialIndex(0)
                    }
                },
                {
                    text: "Выбрать другой билет",
                    style: "cancel",
                    onPress: () => navigation.navigate("Список билетов")
                },
                {   text: `Следующий билет №${route.params.key + 1}`,
                    onPress: () => navigation.navigate(`Билет ${names}`)
                }
            ]
        )
    )




    return { handlerExpired }

}
