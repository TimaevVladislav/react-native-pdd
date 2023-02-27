import React from "react"
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Navigation from "./src/navigation/navigation"
import {ThemeContext, ThemeProvider} from "./src/store/provider/ThemeProvider"
import {DARK_COLORS, LIGHT_COLORS} from "./src/store/data/colors"

import {SearchProvider} from "./src/store/provider/SearchProvider"
import {CountProvider} from "./src/store/provider/CountProvider"

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
