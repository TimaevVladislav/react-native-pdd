import React, {useRef, useState, useEffect} from "react"

export const CountContext = React.createContext({
    ref: null,

})

export const CountProvider = ({children}) => {
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
