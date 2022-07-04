import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { logo } from "../assets/images";
import { fonts } from "../assets/fonts"
import { colors } from "../assets/colors";

const Logo = ({ size = 75, customStyle }) =>{
    return(
        <View style={[styles.container,customStyle]}>
            <Image
                source={logo}
                style={{width: size, height: size, marginRight: size / 5.36}}
            />
            <Text style={[styles.text,{ fontSize: size / 2.5 }]}>pcast</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: "center",
        flexDirection: "row"
    },
    text: {
        color: colors.TITLE,
        fontFamily: fonts.ROBOTO_900
    }
})

export default Logo;