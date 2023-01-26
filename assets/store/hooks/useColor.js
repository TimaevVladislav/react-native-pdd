import {useState} from 'react'

const useColor = () => {

    const initialColors = [
        { id: 0, color: "#DDDDDD" },
        { id: 1, color: "#DDDDDD" },
        { id: 2, color: "#DDDDDD" },
        { id: 3, color: "#DDDDDD" }
    ]

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

    // const [buttonDisabled, setButtonDisabled] = useState(false)
    //
    // const handlerDisabled = () => setButtonDisabled(true)
    //
    // const handlerUpdateColor = (index) => {
    //     let newColor = buttonColor.map((button) => {
    //         if (index === button.id) {
    //             return { ...buttonColor, [button.color]: "black" }
    //         } else {
    //             return button
    //         }
    //     })
    //     setButtonColor(newColor)
    // }
    // const handlerChangeColor = (button, index) => {
    //     if(button[index] && button.correct) {
    //        handlerUpdateColor(index)
    //     } else {
    //        handlerUpdateColor(index)
    //     }
    // }
    // const handlerOnPress = (item, index) => {
    //     handlerDisabled(), handlerChangeColor(item, index), handlerResults(item)
    // }
    const handlerPressButton = (item, index) => {
        handlerChangeColor(item, index)
    }

    return { handlerPressButton, colors }
}

export { useColor }