import {useRef, useState} from 'react'
import {colors as colorIndex} from "../store/data/colors"

export const useColor = () => {
    const [colors, setColor] = useState(["#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD"])
    const colorId = useRef(colorIndex)

    const handlerColorChange = (answer, buttonId, id) => {
        if (!answer.is_correct) {
            setColor(prevColor => prevColor.map((color, id) => id === buttonId ? "red" : prevColor))
            colorId.current[id] = "#DF2E38"
        } else {
            setColor(prevState => prevState.map((color, id) => id === buttonId ? "green" : prevState))
            colorId.current[id] = "#5D9C59"
        }
    }

    return {colors, colorId, handlerColorChange}
}
