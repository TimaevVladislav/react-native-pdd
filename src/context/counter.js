import React, {useState} from "react"

export const CountContext = React.createContext({
    ref: null,
})

export const CountProvider = ({children}) => {
    const [isScrollId, setIsScrollId] = useState(0)
    const [ticketId, setTicketId] = useState(null)

    console.log(ticketId)

    const defaultValue = {
       isScrollId, setIsScrollId,
       ticketId, setTicketId
    }

    return (
        <CountContext.Provider value={defaultValue}>
            {children}
        </CountContext.Provider>
    )
}
