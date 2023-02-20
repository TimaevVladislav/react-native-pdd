import React, {useEffect, useContext} from 'react'
import {useRoute} from "@react-navigation/native"
import {SafeAreaView, View, TextInput, Keyboard,} from 'react-native'

import {data} from "../store/data/data.js"
import {styleSearch} from "../store/data/styles"
import {Entypo, Feather} from "@expo/vector-icons"
import {ContextSigns} from "../screens/Signs"
import {ContextMarkup} from "../screens/Markup"
import {ContextRules} from "../screens/Profile"
import {SearchContext} from "../store/provider/SearchProvider"
import {ThemeContext} from "../store/provider/ThemeProvider"


export const Search = () => (
    <View style={{marginRight: 20, justifyContent: "center", width: 300,}}>
        <SearchComponent />
    </View>
)



const SearchComponent = () => {

    const route = useRoute()
    const {setFiltered, setResults} = useContext(SearchContext)

    const {signs, indexSigns} = useContext(ContextSigns)
    const {rules, indexRules} = useContext(ContextRules)
    const {vertical, horizontal} = useContext(ContextMarkup)


    const getTitle = data.items.map(item => item.title)
    const getNameRules = indexRules.map(item => item.title)

    function Markup() {
        if(route.params.name == "Горизонтальная разметка"){
            setFiltered(horizontal)
            setResults(horizontal)
        } else if(route.params.name == "Вертикальная разметка"){
            setFiltered(vertical)
            setResults(vertical)
        }
    }

    function Rules() {
        indexRules.map(item => {
            if (route.params.name == getNameRules[item.key]) {
                setFiltered(rules[item.key])
                setResults(rules[item.key])
            }
        })
    }
        function SignsDropdown(){
            indexSigns.map(item => {
                if (route.params.name == getTitle[item.key]) {
                    setFiltered(signs[item.key])
                    setResults(signs[item.key])
                }
            })
   }


        useEffect(() => {
            Rules()
            Markup()
            SignsDropdown()
        },[])

    return (
                <ThemeContext.Consumer>
                    {(({isDark}) => (
                        <SearchContext.Consumer>
                            {(({search, clicked, setClicked, setDropdown, setSearch, setLoading, searchFilterFunction}) => (
                                <SafeAreaView>
                                    <View style={styleSearch.container}>
                                        <TextInput
                                            style={[styleSearch.input]}
                                            placeholderTextColor={isDark ? "white" : "#fff"}
                                            placeholder="Поиск"
                                            value={search}
                                            onChangeText={text => searchFilterFunction(text)}
                                            onFocus={() => {
                                                setClicked(true)
                                                setDropdown(true)
                                            }}
                                        />
                                        {clicked ?
                                            <View>
                                                <Entypo name="cross" size={19}
                                                        onPress={() => {
                                                            Keyboard.dismiss()
                                                            setSearch("")
                                                            setLoading(false)
                                                            setClicked(false)
                                                            setDropdown(false)
                                                        }}
                                                />
                                            </View>
                                            :

                                            <Feather name="search" size={20} />
                                        }
                                    </View>
                                </SafeAreaView>
                            ))}
                        </SearchContext.Consumer>
                    ))}
                </ThemeContext.Consumer>
    )
}

