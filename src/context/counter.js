import React, {useRef, useState} from "react"


export const CountContext = React.createContext({
    results: null,
    completedTickets: null,
    isScrollId: null,
    setIsScrollId: () => {},
    mistakeCounter: [],
    correctCounter: []
})

export const CountProvider = ({children}) => {
    const [isScrollId, setIsScrollId] = useState(0)
    const [ticketId, setTicketId] = useState(0)
    const completedTickets = useRef(null)
    const mistakeCounter = useRef([])
    const correctCounter = useRef([])

    const defaultValue = {ticketId, setTicketId, isScrollId, setIsScrollId, completedTickets, mistakeCounter, correctCounter}

    return (
        <CountContext.Provider value={defaultValue}>
            {children}
        </CountContext.Provider>
    )
}
