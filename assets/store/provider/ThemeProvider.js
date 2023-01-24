import React, {useState} from "react"
import {Appearance} from "react-native"
import {DARK_COLORS, LIGHT_COLORS} from "../colors"

// контекст с параметрами по умолчанию
export const ThemeContext = React.createContext({
    isDark: false,
    colors: LIGHT_COLORS,
    setColorScheme: () => {},
});

export const ThemeProvider = ({children, name}) => {
    const colorScheme = Appearance.getColorScheme()

    const [isDark, setIsDark] = useState(colorScheme === "dark")
    const [isLight, setIsLight] = useState("")
    const [isSelected, setIsSelected] = useState(colorScheme === "light")

    const [scrollToIndex, setScrollToIndex] = useState(0)


    const defaultTheme = {
        isDark, isLight,
        isSelected, setIsSelected,
        colors: isDark ? DARK_COLORS : LIGHT_COLORS,
        setIsDark, setIsLight,
        scrollToIndex,
        setScrollToIndex,
        name,
        setColorScheme: (scheme) => {
            setIsDark(scheme === "dark");
        },
    };

    return (
        <ThemeContext.Provider value={defaultTheme}>
            {children}
        </ThemeContext.Provider>
    );
};

