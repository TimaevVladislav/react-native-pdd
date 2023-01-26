import React from "react"
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Navigation from "./assets/navigation/navigation"
import {ThemeContext, ThemeProvider} from "./assets/store/provider/ThemeProvider"
import {DARK_COLORS, LIGHT_COLORS} from "./assets/store/colors"
import {SearchProvider} from "./assets/store/provider/SearchProvider"


export default function App() {
  const Stack = createNativeStackNavigator()
  return (
          <ThemeProvider>
              <SearchProvider>
                      <ThemeContext.Consumer>
                          {(({isDark, name}) => (
                              <NavigationContainer>
                                  <Stack.Navigator screenOptions={{
                                      headerStyle: {
                                          backgroundColor: isDark ? DARK_COLORS.layout : "#0d6efd"},
                                      headerTintColor: '#fff'
                                  }}>
                                      {Navigation()}
                                  </Stack.Navigator>
                              </NavigationContainer>
                          ))}
                      </ThemeContext.Consumer>
              </SearchProvider>
          </ThemeProvider>
  );
}
