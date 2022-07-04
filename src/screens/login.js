import React, { useState } from "react";
import { StyleSheet, View, Text, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import AuthInput from "../components/inputs/authInput";
import Logo from "../components/logo";
import Page from "../layouts/page";
import { colors } from "../assets/colors";
import { loginBackground } from "../assets/images"
import { fonts } from "../assets/fonts";
import { mail, key } from "../assets/images";
import axios from "axios";
import { BASE_URL } from "../consts/url";
import storage from "../utils/storage";
import { useAtom } from "jotai";
import { USER_SIGNED_IN } from "../utils/atom";
import { useMutation } from "react-query";
import { LOGIN } from "../utils/request";

const { width, height } = Dimensions.get("screen")

const Login = () =>{

    const [userSignedIn,setUserSignedIn] = useAtom(USER_SIGNED_IN)

    const [email,setEmail] = useState("test@example.com")
    const [password,setPassword] = useState("123456")

    const { mutate } = useMutation(
        "LOGIN", 
        (postData) => LOGIN(postData).then(res => res.data.access_token),
        {
            onSuccess: (access_token) => {
                const token = `Bearer ${access_token}`
                storage.setItem("token",JSON.stringify(token))
                setUserSignedIn(true)
            },
            onError: (err) => console.log(err)
        }
    )

    const handleSubmit = () => {
        const postData = {  email, password }
        mutate(postData)
    }

    return(
        <Page bgColor={colors.DARK_BG}>
            <ImageBackground
                source={loginBackground}
                style={styles.imageBackground}
            >
                <View style={styles.content}>
                    <LinearGradient
                        style={styles.linearBackground}
                        colors={["rgba(9, 18, 28, 0)","rgba(9, 18, 28, 1)","rgba(9, 18, 28, 0)"]}
                        locations={[0,0.4601,1.0711]}
                    >
                        <Logo/>
                        <Text style={styles.title}>Episodic series of digital audio</Text>
                        <AuthInput 
                            value={email} 
                            setValue={setEmail}
                            placeholder="E-mail address"
                            image={mail}
                            customStyle={{ marginTop:72 }}
                        />
                        <AuthInput 
                            value={password} 
                            setValue={setPassword}
                            placeholder="Password"
                            image={key}
                            customStyle={{ marginTop: 16 }}
                        />
                        <TouchableOpacity
                            onPress={() => handleSubmit()}
                            style={styles.buttonWrapper}
                        >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Login</Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ImageBackground>
        </Page>
    )
}

const styles = StyleSheet.create({
    imageBackground: { flex: 1, minHeight: height },
    content: {
        backgroundColor: colors.DARK_BG,
        width: width / 1.1,
        height: height / 1.07,
        borderBottomRightRadius: 24,
        overflow: "hidden"
    },
    linearBackground: {
        flex: 1,
        paddingTop: 51,
        paddingLeft: 32,
        paddingRight: 34
    },
    title: {
        width: "75%",
        fontFamily: fonts.ROBOTO_500,
        fontSize: 24,
        lineHeight: 30,
        color: colors.TITLE,
        marginTop: 48
    },
    buttonWrapper: {
        marginTop: 30,
    },
    button: {
        backgroundColor: colors.BLUE,
        padding: 12,
        borderRadius: 99,
        shadowColor: colors.BLUE,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.7,
        shadowRadius: 50,

        elevation: 10,
    },
    buttonText: {
        fontFamily: fonts.ROBOTO_500,
        fontSize: 16,
        color: colors.TITLE,
        textAlign: "center"
    }
})

export default Login;