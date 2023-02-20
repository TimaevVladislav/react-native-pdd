import {useState} from 'react'
import {colors as colorIndex} from "../store/data/colors"
const useColor = () => {
    const [colors, setColor] = useState(["#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD"])
    const [colorId, setColorId] = useState(colorIndex)

    const handlerColorChange = (answer, buttonId) => {
        if (!answer.is_correct) {
            setColor(prevColor => prevColor.map((color, id) => {
                return id === buttonId ? "red" : prevColor
            }))
            setColorId(prevColor => prevColor.map((color, id) => id === buttonId ? "red" : prevColor ))
        } else {
            setColor(prevState => prevState.map((color, id) => id === buttonId ? "green" : prevState))
        }

    }

    return { colors, colorId, handlerColorChange }
}

export { useColor }