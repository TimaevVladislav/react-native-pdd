import React from "react"
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Navigation from "./src/navigation/navigation"
import {ThemeProvider, ThemeContext} from "./src/context/theme"
import {DARK_COLORS} from "./src/store/data/colors"
import {CountProvider} from "./src/context/counter"
import {SearchProvider} from "./src/context/search"

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
                 <ThemeProvider>
                     <CountProvider>
                           <SearchProvider>
                               <ThemeContext.Consumer>
                                   {(({isDark, name}) => (
                                       <NavigationContainer>
                                           <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: isDark ? DARK_COLORS.layout : "#0d6efd"}, headerTintColor: '#fff'}}>
                                               {Navigation()}
                                           </Stack.Navigator>
                                       </NavigationContainer>
                                   ))}
                               </ThemeContext.Consumer>
                           </SearchProvider>
                     </CountProvider>
                 </ThemeProvider>
  )
}
