import React, {useState, useEffect, useContext} from "react"
import {useNavigation, useRoute} from "@react-navigation/native"
import {Text, View, VirtualizedList} from "react-native"


import {styleSigns} from "../store/data/styles"
import {ContextMarkup} from "../screens/Markup"
import {ContextRules} from "../screens/Profile"
import {ContextSigns} from "../screens/Signs"
import {ThemeContext} from "../context/theme"
import {DARK_COLORS, LIGHT_COLORS} from "../store/data/colors"
import {SearchContext} from "../context/search"

import Dropdown from "./layouts/Dropdown"
import {LocalSvg} from "./default/LocalSvg"
import {ErrorMessage, Loader} from "./default/Loader"


const SignsList = () => (
               <ThemeContext.Consumer>
                   {(({isDark}) => (
                       <View style={{backgroundColor: isDark ? DARK_COLORS.layout : LIGHT_COLORS.layout}}>
                           <FloatList />
                       </View>
                   ))}
               </ThemeContext.Consumer>
)


export default SignsList

function FloatList () {
    const route = useRoute()
    const navigation = useNavigation()

    const {horizontal, vertical} = useContext(ContextMarkup)
    const {rules, indexRules} = useContext(ContextRules)
    const {signs, indexSigns} = useContext(ContextSigns)
    const {setDropdown, setSearch, setClicked} = useContext(SearchContext)

    const [state, setState] = useState([])

    const getItem = (data, index) => data[index]

    useEffect(() => {
        MarkupState()
        RulesState()
        SignsState()
    },[route.params.name])

    const MarkupState = () => {
        if(route.params.name == "Горизонтальная разметка") {
            setState(horizontal)
        } else if (route.params.name == "Вертикальная разметка") {
            setState(vertical)
        }
    }

    const SignsState = () => {
        indexSigns.map(item => {
            if(route.params.name == item.title) {
                setState(signs[item.key])
            }
        })
    }


    const RulesState = () => {
        indexRules.map(item => {
            if(route.params.name == item.title) {
                setState(rules[item.key])
            }
        })
    }


    useEffect(() => {
        const clearDropdown = navigation.addListener('beforeRemove', (e) => {
             if(!e.data.closing){
                 setSearch(""), setDropdown(false), setClicked(false)
             }
        });
        return clearDropdown
    }, [navigation])


    const Item = ({heading, title, text, img}) => (
        <ThemeContext.Consumer>
            {(({isDark}) => (
                <View>
                    <View style={styleSigns.p}>
                        <LocalSvg asset={img} />
                    </View>
                    <View>
                        <Text style={[styleSigns.heading, {color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}]}>
                            {heading}
                        </Text>
                        <Text style={[styleSigns.title, {color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}]}>
                            {title}
                        </Text>
                        <Text style={[styleSigns.text, {color: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}]}>
                            {text}
                        </Text>
                    </View>
                </View>
            ))}
        </ThemeContext.Consumer>
    )

    return (
            <SearchContext.Consumer>
                {(({dropdown, filtered, loading}) => (
                    <>
                        { loading ? <Loader /> : filtered.length > 0 ? null : !dropdown ? null : <ErrorMessage /> }

                        {dropdown ? <Dropdown /> :
                            <VirtualizedList
                                data={state}
                                initialNumToRender={50}
                                renderItem={({ item }) => <Item title={item.title} heading={item.heading} text={item.text} img={item.img} id={item.key} />}
                                keyExtractor={item => item.key}
                                getItemCount={data => data.length}
                                ListFooterComponent={Item}
                                getItem={getItem}
                            />
                        }
                    </>
                ))}
            </SearchContext.Consumer>
    )
}