import React, {useState, useEffect, useRef} from "react"
import {useNavigation, useRoute} from "@react-navigation/native"

export const useScroll = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const ref = useRef(null)

    const [index, setIndex] = useState(0)
    const [countCorrect, setCountCorrect] = useState(1)
    const [countIncorrect, setCountIncorrect] = useState(1)
    const [countResults, setCountResults] = useState(0)

    const scrollHandler = () => {

        if(index < 19){
            setIndex(index + 1)
        } else {
            setIndex(index)
        }

        ref.current.scrollToIndex({
            index,
            animated: false,
        })

    }


    const handlerCountResults = (item) => {

        scrollHandler()

        if(!item.correct) {
            setCountIncorrect(countIncorrect + 1)
        } else {
            setCountCorrect(countCorrect + 1)
        }

        const results = (countCorrect - countIncorrect) * -1

        if(countIncorrect === 1) {
            setCountResults(0)
        } else if (countIncorrect !== 1) {
            setCountResults(results)
        }

        if(route.params.scrollIndex === 19){
            navigation.navigate("Результат", { results: countResults, initialIndex: setIndex })
        }

    }

    return { handlerCountResults, index, ref, route, setIndex, navigation }

}