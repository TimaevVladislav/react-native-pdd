import React, {useState} from "react"

// контекст с параметрами по умолчанию
export const SearchContext = React.createContext({
    setResults: () => {},
    setClicked: () => {},
});

export const SearchProvider = ({children}) => {

    const [dropdown, setDropdown] = useState(false)
    const [clicked, setClicked] = useState(false)

    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState([])
    const [results, setResults] = useState([])

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = results.filter(item => {
                const itemData = item.heading ? item.heading.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase()

                return itemData.indexOf(textData) > -1
            })
            setFiltered(newData)
            setSearch(text)
        } else {
            setFiltered(results)
            setSearch(text)
        }
    };



    const defaultStates = {
        filtered,
        dropdown, setDropdown,
        search,
        clicked,
        setClicked,
        setSearch,
        setFiltered,
        setResults,
        searchFilterFunction
    };

    return (
        <SearchContext.Provider value={defaultStates}>
            {children}
        </SearchContext.Provider>
    );
};
