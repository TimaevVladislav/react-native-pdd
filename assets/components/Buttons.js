import React from "react"
import {
    Text,
    TouchableOpacity,
    View
} from "react-native"

import {styleTicket} from "../screens/Exam"
import {useColor} from "../store/hooks/useColor"

export const ButtonsExam = ({answers}) => {
    const { handlerPressButton, isDisabled, colors } = useColor()

    return (
        answers.map((item, i) =>  (
            <View style={styleTicket.container}>
                <TouchableOpacity
                    disabled={isDisabled}
                    onPress={() => handlerPressButton(item, i)}
                    style={[{backgroundColor: colors[i].color }, styleTicket.item]}>
                    <Text style={styleTicket.itemText}>
                        {`${i + 1}.  ${item.answer_text}`}
                    </Text>
                </TouchableOpacity>
            </View>
        ))
    )
}


//
// key={i}
// disabled={buttonDisabled}
// onPress={() => handlerOnPress(item, i)}
// style={[{backgroundColor: buttonColor[i].color }, styleTicket.item]}

// const ListRender = () => (
//     <SafeAreaView>
//         <FlatList
//             initialNumToRender={5}
//             scrollEnabled={false}
//             showsHorizontalScrollIndicator={false}
//             data={items}
//             renderItem={({item}) => <ButtonsExam answers={item.answers} /> }
//             keyExtractor={item => item.id}
//         />
//     </SafeAreaView>
// )