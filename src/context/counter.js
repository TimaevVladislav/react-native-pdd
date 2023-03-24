import React, {useRef, useState} from "react"

export const CountContext = React.createContext({
    results: null,
})

export const CountProvider = ({children}) => {
    const [isScrollId, setIsScrollId] = useState(0)
    const [ticketId, setTicketId] = useState(0)
    const results = useRef(null)

    const defaultValue = {
       ticketId, setTicketId,
       isScrollId, setIsScrollId,
       results
    }

    return (
        <CountContext.Provider value={defaultValue}>
            {children}
        </CountContext.Provider>
    )
}
