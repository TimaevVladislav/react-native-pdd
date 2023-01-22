import React, {useState, useEffect, useContext} from "react"
import {useNavigation, useRoute} from "@react-navigation/native"
import {Text, View, VirtualizedList, ScrollView, StyleSheet} from "react-native"


import {styleSigns} from "../store/globalStyle"
import {SvgUri} from "react-native-svg"
import {ContextMarkup} from "../screens/Markup"
import {ContextRules} from "../screens/Profile"
import {ContextSigns} from "../screens/Signs"
import {ThemeContext} from "../store/provider/ThemeProvider"
import {DARK_COLORS, LIGHT_COLORS} from "../store/colors"
import {SearchContext} from "../store/provider/SearchProvider"

import Dropdown from "./Dropdown"


const SignsList = () => (
        <ThemeContext.Consumer>
            {(({isDark}) => (
                <ScrollView style={{backgroundColor: isDark ? DARK_COLORS.layout : LIGHT_COLORS.layout}}>
                    <FloatList />
                </ScrollView>
            ))}
        </ThemeContext.Consumer>
)


export default SignsList;

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
    };

    const SignsState = () => {
        indexSigns.map(item => {
            if(route.params.name == item.title) {
                setState(signs[item.key])
            }
        })
    };


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


    const Item = ({heading, title, text, img, id}) => (
        <ScrollView>
            <View style={styleSigns.p}>
                <SvgUri uri={img} />
            </View>
            <View>
                <Text style={[styleSigns.heading]}>
                    {heading}
                </Text>
                <Text style={[styleSigns.title]}>
                    {title}
                </Text>
                <Text style={[styleSigns.text]}>
                    {text}
                </Text>
            </View>
        </ScrollView>
    )


    return (
               <SearchContext.Consumer>
                   {(({dropdown, filtered}) => (
                       <>
                           <Text style={style.container}>{filtered === null ? "Ничего не найдено" : route.params.name }</Text>
                           {dropdown ? <Dropdown iconId={route.params.iconId} /> :
                               <VirtualizedList
                                   data={state}
                                   initialNumToRender={4}
                                   renderItem={({ item }) => <Item title={item.title} heading={item.heading} text={item.text} img={item.img} id={item.key} />}
                                   keyExtractor={item => item.key}
                                   getItemCount={data => data.length}
                                   getItem={getItem}
                               />
                           }
                       </>
                   ))}
               </SearchContext.Consumer>
    );
}

const style = StyleSheet.create({
    container:{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        padding: 20
    }
})