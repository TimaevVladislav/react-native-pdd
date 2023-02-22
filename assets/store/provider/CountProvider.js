import React, {useRef, useState, useEffect} from "react"

export const CountContext = React.createContext({
    ref: null,
    correct: false,
    incorrect: false,
    countResult: false
})

export const CountProvider = ({children}) => {
    const [countResults, setCountResults] = useState(0)
    const [passExam, setPassExam] = useState(false)
    const ref = useRef(null)
    const [isScrollId, setIsScrollId] = useState(0)

    const defaultValue = {
       isScrollId, setIsScrollId
    }


    return (
        <CountContext.Provider value={defaultValue}>
            {children}
        </CountContext.Provider>
    )
}
