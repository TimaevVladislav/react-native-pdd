import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Alert} from "react-native"
import {useCountdown} from "../hooks/useCountdown"
import {useNavigation, useRoute} from "@react-navigation/native"
import DateTimeDisplay from "./DateTimeDisplay"


const CountdownTimer = ({targetDate, key, names, showHandle}) => {
    const navigation = useNavigation()
    const [minutes, seconds] = useCountdown(targetDate)

    if(minutes + seconds <= 0){
      return (
          <AlertExpired
              showHandle={showHandle}
              targetDate={targetDate}
              navigation={navigation}
              names={names}
              key={key}
          />
      )

    } else {
      return (
          <ShowCounter
             minutes={minutes}
             seconds={seconds}
          />
    );
}
    // if (minutes + seconds <= 0) {



};

const AlertExpired = ({names, navigation}) => {

    const route = useRoute()

    Alert.alert(
        "К сожалению, вы не прошли тестирование :(",
        `Правильных ответов: 0 из 20`,
        [
            {
                text: "Пройти тест еще раз",
                onPress: () => {
                    route.params.initialIndex(0)
                }
            },
            {
                text: "Выбрать другой билет",
                onPress: () => navigation.navigate("Билеты для экзамена"),
                style: "cancel"
            },
            {   text: `Следующий билет №${route.params.key + 1}`,
                onPress: () => {
                    navigation.navigate(`Билет ${names}`)
                }
            }
        ]
    )
};

const ShowCounter = ({ minutes, seconds }) => (
    <View style={style.container}>
        <DateTimeDisplay min={minutes} seconds={seconds} isDanger={false} />
    </View>
)


export default CountdownTimer;



const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'flex-end',
    }
})