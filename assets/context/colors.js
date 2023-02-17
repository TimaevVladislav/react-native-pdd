import React, {useState} from "react"
export const ColorContext = React.createContext()
export const ColorProvider = ({children}) => {
    const [colors, setColor] = useState(["#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD"])
    const handlerColor = (answer, buttonId) => {
        if (!answer.is_correct) {
            setColor(prevState => prevState.map((color, id) => id === buttonId ? "red" : prevState))
        } else {
            setColor(prevState => prevState.map((color, id) => id === buttonId ? "green" : prevState))
        }
    }


    return (
        <ColorContext.Provider value={colors}>
            {children}
        </ColorContext.Provider>
    )
}
