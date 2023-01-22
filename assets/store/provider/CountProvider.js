import React, {useState} from "react"

export const CountContext = React.createContext({
    correct: false,
    incorrect: false,
    countResult: false
});

export const CountProvider = ({children}) => {

    const [stopIntervalHandle, setStopIntervalHandle] = useState(false)
    const [countResults, setCountResults] = useState(0)
    const [passExam, setPassExam] = useState(false)


    const defaultValue = {
        passExam,
        countResults,
        setCountResults,
        setStopIntervalHandle,
        stopIntervalHandle
    };

    return (
        <CountContext.Provider value={defaultValue}>
            {children}
        </CountContext.Provider>
    );
};
