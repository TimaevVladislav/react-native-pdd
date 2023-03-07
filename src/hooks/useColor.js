import {useState} from 'react'
import {colors as colorIndex} from "../store/data/colors"
import {mistakes} from "../store/questions/A_B/tickets/mistakes"

const useColor = (item) => {
    const [colors, setColor] = useState(["#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD"])
    const [colorId, setColorId] = useState(colorIndex)

    const handlerColorChange = (answer, buttonId) => {
        if (!answer.is_correct) {
            if (!mistakes.includes(item)) {
                mistakes.push(item)
            }
            setColor(prevColor => prevColor.map((color, id) => id === buttonId ? "red" : prevColor))
            setColorId(prevColor => prevColor.map((color, id) => id === buttonId ? "red" : prevColor ))
        } else {
            setColor(prevState => prevState.map((color, id) => id === buttonId ? "green" : prevState))
            mistakes.pop(item)
        }
    }

    return { colors, colorId, handlerColorChange }
}

export { useColor }