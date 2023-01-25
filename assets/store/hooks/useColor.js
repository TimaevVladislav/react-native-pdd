import {useState} from 'react'

const useColor = () => {

    const initialColors = [
        { id: 0, color: "#DDDDDD" },
        { id: 1, color: "#DDDDDD" },
        { id: 2, color: "#DDDDDD" },
        { id: 3, color: "#DDDDDD" }
    ]

    const [isDisabled, setIsDisabled] = useState(false)
    const [colors, setColor] = useState(initialColors)

    const [buttonColor, setButtonColor] = useState(initialColors)

    const handleChangeColor = (index) => {
        let newColor = buttonColor.map((button) => {
            if (index === button.id) {
                return { ...buttonColor, [button.color]: "black" }
            } else {
                return button
            }
        })
        setButtonColor(newColor)
    }
    const handlerChangeColor = (button, index) => {
        if(button[index] && button.correct) {
            handleChangeColor(index)
        } else {
            handleChangeColor(index)
        }
    }
    const handlerPressButton = (item, index) => {
        setIsDisabled(true),
        handlerChangeColor(item, index)
    }

    return { handlerPressButton, isDisabled, colors }
}

export { useColor }