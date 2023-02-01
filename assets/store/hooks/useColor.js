import {useState} from 'react'

const useColor = (answer, buttonId) => {
    const [colors, setColor] = useState(["#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD"])
    const handlerColorChange = (answer, buttonId) => {
        if (!answer.is_correct) {
            setColor(prevState => prevState.map((color, id) => id === buttonId ? "red" : prevState))
        } else {
            setColor(prevState => prevState.map((color, id) => id === buttonId ? "green" : prevState))
        }
    }

    return { colors, handlerColorChange }
}

export { useColor }