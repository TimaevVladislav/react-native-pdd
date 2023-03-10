import React, {useState, useEffect} from "react"
import {useNavigation, useRoute} from "@react-navigation/native"

import {Alert} from "react-native"
import {CountContext} from "../store/provider/CountProvider"


const START_MINUTES = '20'
const START_SECOND = '00'
const START_DERATION = 10

const useTimer = () => {

    const route = useRoute()
    const navigation = useNavigation()
    const [currentMinutes, setMinutes] = useState(START_MINUTES)
    const [currentSeconds, setSeconds] = useState(START_SECOND)

    const [isStop, setIsStop] = useState(false)
    const [duration, setDuration] = useState(START_DERATION)
    const [isRunning, setIsRunning] = useState(false)

    const handlerStart = () => {
        setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10))
        setIsRunning(true)
    }

    const handlerStop = () => {
        setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10))
        setIsStop(true)
        setIsRunning(false)
    }


    const handlerReset = () => {
        setMinutes(START_MINUTES)
        setSeconds(START_SECOND)
        setIsRunning(false)
        setIsStop(false)
        setDuration(START_DERATION)
    }

    const handlerResume = () => {
        let newDuration = parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10)
        setDuration(newDuration)
        setIsRunning(true)
        setIsStop(false)
    }

    useEffect(() => {
        if (isRunning) {

            let timer = duration
            let minutes, seconds

            const interval = setInterval(() => {
                if (--timer <= 0) {
                    handlerExpired()
                    handlerStop()
                    setSeconds(null)
                    setMinutes(null)
                } else {
                    minutes = parseInt(timer / 60, 10)
                    seconds = parseInt(timer % 60, 10)

                    minutes = minutes < 10 ? '0' + minutes : minutes
                    seconds = seconds < 10 ? '0' + seconds : seconds

                    setMinutes(minutes)
                    setSeconds(seconds)
                }
            }, 1000)

            return () => clearInterval(interval)
        }

    }, [isRunning])


    useEffect(() => {
        handlerStart()
    }, [isRunning])


    const handlerExpired = () => (

        Alert.alert(
            "?? ??????????????????, ???? ???? ???????????? ???????????????????????? :(",
            `???????????????????? ??????????????: 0 ???? 20`,
            [
                {
                    text: "???????????? ???????? ?????? ??????",
                    onPress: () => { handlerReset(), route.params.initialIndex(0) },
                },
                {
                    text: "?????????????? ???????????? ??????????",
                    style: "cancel",
                    onPress: () => navigation.navigate("???????????? ??????????????")
                },
                {   text: `?????????????????? ?????????? ???${route.params.key + 1}`,
                    onPress: () => navigation.navigate(`?????????? ${names}`)
                }
            ]
        )

    )

    const handlerConfirm = (setIsScrollId) => (

        Alert.alert(
            "???????????? ???????????",
            `?????????? ???????????????????? ??????????`,
            [
                {
                    text: "????????????????????",
                    onPress: () => console.log("swsw"),
                    style: "cancel",

                },
                {   text: `??????????`,
                    style: "cancel",
                    onPress: () => {
                        setIsScrollId(0)
                        navigation.goBack()
                    }

                }
            ]
        )
    )


    return { currentMinutes, currentSeconds, handlerConfirm }
}

export { useTimer }