import React, {useState} from "react"
export const DisableContext = React.createContext({
    isDisabled: false,
    setIsDisabled: () => {}
 })

export const DisableProvider = ({children}) => {
    const [isDisabled, setIsDisabled] = useState(false)
    const defaultValue = { isDisabled, setIsDisabled }

    return (
        <DisableContext.Provider value={defaultValue}>
            {children}
        </DisableContext.Provider>
    )
}
