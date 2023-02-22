import React, {useState} from "react"

export const FavoriteContext = React.createContext({
   isFavorite: true,
   setIsFavorite: false,
})

export const FavoriteProvider = ({children}) => {
    const [isFavorite, setIsFavorite] = useState(false)

    const defaultValue = {
        isFavorite, setIsFavorite
    }

    return (
        <FavoriteContext.Provider value={defaultValue}>
            {children}
        </FavoriteContext.Provider>
    )
}
