import {StyleSheet} from "react-native"


export const styleSigns = StyleSheet.create({
    p: {
        padding: 10
    },
    heading: {
        padding: 10,
        fontSize: 19,
        fontWeight: "bold"
    },
    title: {
        padding: 10,
        fontSize: 16,
        fontWeight: "normal"
    },
    text: {
        padding: 10,
        marginBottom: 50,
    }
});

export const styleSearch = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    input: {
        fontWeight: "normal",
        color: "#fff",
        fontSize: 18
    },
    dropDown: {
        padding: 20,
        backgroundColor: "grey"
    }
});


