import React, {useEffect, useState} from "react"
export const StateButtonContext = React.createContext({
    correct: false,
    incorrect: false
});

export const StateButtonProvider = ({children}) => {


    const [isColor, setIsColor] = useState("#DDDDDD")
    const [disabledButton, setDisabledButton] = useState(false)

    const defaultState = {
        isColor, setIsColor,
        disabledButton, setDisabledButton
    };

    return (
        <StateButtonContext.Provider value={defaultState}>
            {children}
        </StateButtonContext.Provider>
    );
};
