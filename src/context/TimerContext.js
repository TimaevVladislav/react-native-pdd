import {createContext} from "react"

function noop () {}

export const TimerContext = createContext({
    handlerStart: noop,
    handlerStop: noop,
    handlerReset: noop,
    handlerResume: noop
})


