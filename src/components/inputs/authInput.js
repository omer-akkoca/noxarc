import React from "react";
import { StyleSheet, View, Image, TextInput } from "react-native";
import { colors } from "../../assets/colors";
import { fonts } from "../../assets/fonts";

const AuthInput = ({ value, setValue, placeholder, image, customStyle }) =>{
    return(
        <View style={[styles.container,customStyle]}>
            <Image source={image}/>
            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={(text) => setValue(text)}
                placeholderTextColor={colors.PLACEHOLDER_TEXT_COLOR}
                style={styles.input}
                autoFocus={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: colors.INPUT_BORDER_COLOR,
        borderRadius: 16,
        borderBottomRightRadius: 0,
        alignItems: "center",
        paddingHorizontal: 23,
        paddingVertical: 8
    },
    input: {
        flex: 1,
        marginLeft: 24,
        fontFamily: fonts.ROBOTO_400,
        fontSize: 14,
        lineHeight: 17.5,
        color: colors.INPUT_TEXT_COLOR,
    }
})

export default AuthInput;