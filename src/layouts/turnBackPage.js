import React from "react";
import { StyleSheet, View, StatusBar, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { back } from "../assets/images";

const TurnBackPage = ({ bgColor, children }) => {

    const navigation = useNavigation()

    return(
        <>
            <StatusBar hidden/>
            <View style={[styles.container, { backgroundColor : bgColor }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={back}/>
                </TouchableOpacity>
                {children}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        position: "relative"
    },
    backButton : {
        position: "absolute",
        top: 60, left: 33,
        zIndex: 10
    }
})

export default TurnBackPage;