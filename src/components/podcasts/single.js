import React from "react";
import { StyleSheet, View, Text, ImageBackground, Image, Dimensions, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../assets/colors";
import { fonts } from "../../assets/fonts";
import { play, time } from "../../assets/images";
import { getRandomImage } from "../../consts/consts";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../consts/screens"

const { width } = Dimensions.get("screen")

const Single = ({podcast}) =>{

    const navigation = useNavigation()

    const { title, author } = podcast
    const backUrl = getRandomImage()
    const userImage = "https://images.unsplash.com/photo-1633332755192-727a05c4013d"

    const handlePlay = () =>{
        navigation.navigate(screens.PODCAST, { podcast })
    }

    return(
        <ImageBackground 
            source={{ uri: backUrl }}
            style={style.imageBgContainer}    
        >
            <LinearGradient colors={["rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)"]} style={{flex:1}}>
                <LinearGradient colors={["rgba(9, 18, 28, 0.8)","rgba(9, 18, 28, 0)"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} locations={[0.1094,1]} style={{flex:1}}>
                    <View style={style.content}>

                        <Text numberOfLines={2} style={style.title}>{title}</Text>

                        <View style={style.cardBottom}>
                            <View style={style.bottomLeft}>
                                <View style={style.bottomLeftTop}>
                                    <Text style={style.bottomLeftTopText}>23.05.2019</Text>
                                    <Image source={time} style={style.bottomLeftTopIcon}/>
                                    <Text style={style.bottomLeftTopText}>24.15:05</Text>
                                </View>
                                <View style={style.bottomLeftBottom}>
                                    <Image source={{uri: userImage}} style={style.userImage}/>
                                    <Text style={style.userName}>{author}</Text>
                                </View>
                            </View>
                            <View style={style.bottomRight}>
                                <TouchableOpacity onPress={() => handlePlay()}>
                                    <View style={style.playButton}>
                                        <Image source={play} style={style.playButtonIcon}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </LinearGradient>
            </LinearGradient>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    imageBgContainer: {
        flex: 1,
        borderRadius: 24,
        borderBottomRightRadius: 0,
        marginBottom: 20,
        overflow: "hidden",
        resizeMode: "cover"
    },
    content: {
        flex: 1,
        paddingVertical: 28,
        paddingRight: 24, paddingLeft: 32,
    },
    title: {
        width: "95%",
        fontFamily: fonts.ROBOTO_500,
        fontSize: 24,
        lineHeight: 30,
        color: colors.TITLE,
        marginBottom: 25
    },
    cardBottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    bottomLeft: {},
    bottomLeftTop: {
        flexDirection: "row",
        alignItems: "center"
    },
    bottomLeftTopText: {
        fontFamily: fonts.ROBOTO_400,
        fontSize: 13,
        lineHeight: 22.1,
        color: colors.PLACEHOLDER_TEXT_COLOR
    },
    bottomLeftTopIcon: {
        marginHorizontal: 10,
        width: width / 28.84,
        height: width / 28.84
    },
    bottomLeftBottom: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8
    },
    userImage: {
        borderRadius: 99,
        width: width / 20,
        height: width / 20,
        marginRight: 8
    },
    userName: {
        fontFamily: fonts.ROBOTO_400,
        fontSize: 13,
        lineHeight: 22.1,
        color: colors.TITLE
    },
    playButton: {
        width: width / 7.35,
        height: width / 7.35,
        borderRadius: 99,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.PLAY_BUTTON_RED,
        shadowColor: colors.PLAY_BUTTON_RED,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.7,
        shadowRadius: 50,

        elevation: 10,
    },
    playButtonIcon : {
        width: 16,
        height: 19,
        transform: [{translateX:1}]
    }
})

export default Single;