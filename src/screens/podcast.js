import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, ImageBackground, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import Slider from '@react-native-community/slider';
import TurnBackPage from "../layouts/turnBackPage";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../assets/colors"
import { podcastBg, sliderThumb, like, unlike, showEpisode, showSize, moreMenu, backPodcast, nextPodcast, pause, author1, author2, play } from "../assets/images";
import { fonts } from "../assets/fonts"
import Sound from "react-native-sound";

Sound.setCategory("Playback")

const { width } = Dimensions.get("screen")

const Podcast = ({ route }) =>{
    const { podcast } = route?.params

    const [audio,setAudio] = useState(new Sound("",null))
    const [duration,setDuration] = useState(0)
    const [second,setSecond] = useState(0)
    const [isPlaying,setIsPlaying] = useState(true)

    useEffect(()=>{
        const voice = new Sound(podcast.audio_url, null, () => {
            setDuration(voice.getDuration())
            voice.play()
            voice.getCurrentTime((second) => setSecond(second))
        })
        setAudio(voice)
        return () => voice.release()
    },[podcast])

    useEffect(() => {
        if (audio) {
            var id = setInterval(() => {
                audio.getCurrentTime((second) => {
                    setSecond(second)
                })
            }, 1000);
        }
        return () => clearInterval(id)
    },[audio])

    const playPause = () => {
        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
        setIsPlaying(curr => !curr)
    }

    return(
        <TurnBackPage bgColor={"#19232F"}>
            <View style={styles.topContainer}>
                <ImageBackground source={podcastBg} style={{ flex : 1, position: "relative" }}>
                    <Image style={styles.author1} source={author1}/>
                    <Image style={styles.author2} source={author2}/>
                    <LinearGradient
                        colors={["rgba(9, 18, 28, 0)","#19232F"]}
                        locations={[0,1]}
                        style={styles.topContent}
                    >
                        <Text style={styles.topTitle}>{podcast?.title}</Text>
                        <Text style={styles.author}>{podcast?.author} ---- {second}</Text>
                        <View style={styles.actionsWrapper}>
                            <TouchableOpacity>
                                <Image source={backPodcast}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => playPause()}>
                                <Image source={isPlaying ? pause : play}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={nextPodcast}/>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
            <View style={styles.bottomContainer}>
                <ScrollView style={styles.bottomContent}>
                    <Slider
                        style={{ flex:1, height: 50 }}
                        minimumValue={0}
                        maximumValue={duration}
                        minimumTrackTintColor={colors.BLUE}
                        maximumTrackTintColor="#ffffff"
                        thumbTintColor={colors.BLUE}
                        thumbImage={sliderThumb}
                        onValueChange={(e) => {
                            setSecond(e)
                            audio.setCurrentTime(e)
                        }}
                        value={second}
                    />
                    <View style={styles.bottomSecond}>
                        <View style={styles.childrenWrapper}>
                            <Image source={like} style={{ marginRight: 10 }}/>
                            <Text style={styles.likeText}>{podcast?.likes}</Text>
                        </View>
                        <View>
                            <Text style={styles.duration}>{Math.floor(duration)}sn</Text>
                        </View>
                        <View style={styles.childrenWrapper}>
                            <Text style={styles.dislikesText}>{podcast?.dislikes}</Text>
                            <Image source={unlike} style={{ marginLeft: 10 }}/>
                        </View>
                    </View>
                    <View style={styles.bottomThird}>
                        <View style={styles.childrenWrapper}>
                            <Image source={showEpisode} style={{ marginRight: 10 }}/>
                            <Text style={styles.likeText}>Episode 2</Text>
                        </View>
                        <View style={styles.childrenWrapper}>
                            <Image source={showSize} style={{ marginRight: 10 }}/>
                            <Text style={styles.likeText}>{podcast?.file_size}mb</Text>
                        </View>
                        <View>
                            <Image source={moreMenu}/>
                        </View>
                    </View>
                    <Text style={styles.podcastDesc}>{podcast?.description}</Text>
                </ScrollView>
            </View>
        </TurnBackPage>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1.25,
    },
    bottomContainer: {
        backgroundColor: colors.DARK_BG,
        flex: 1.5,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
    },
    bottomContent: {
        padding: 33
    },
    bottomSecond: {
        marginTop: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 25,
        borderBottomWidth: 1,
        borderColor: colors.INPUT_BORDER_COLOR
    },
    childrenWrapper: {
        alignItems: "center",
        flexDirection: "row"
    },
    likeText: {
        fontFamily: fonts.ROBOTO_400,
        fontSize: 14,
        lineHeight: 20.4,
        color: colors.TITLE
    },
    dislikesText: {
        fontFamily: fonts.ROBOTO_400,
        fontSize: 14,
        lineHeight: 20.4,
        color: colors.PLACEHOLDER_TEXT_COLOR
    },
    duration: {
        fontFamily: fonts.ROBOTO_500,
        fontSize: 14,
        lineHeight: 23.8,
        color: colors.TITLE
    },
    bottomThird: {
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    podcastDesc: {
        marginTop: 36,
        fontFamily: fonts.ROBOTO_400,
        fontSize: 16,
        lineHeight: 22.1,
        color: colors.PLACEHOLDER_TEXT_COLOR
    },
    topContent: {
        position: "relative",
        paddingBottom: 41,
        flex: 1, 
        justifyContent: "flex-end", 
        alignItems: "center"
    },
    topTitle: {
        width: "65%",
        fontFamily: fonts.ROBOTO_500,
        fontSize: 24,
        lineHeight: 30,
        color: colors.TITLE,
        fontWeight: "500",
        textAlign: "center"
    },
    author: {
        marginTop: 20,
        fontFamily: fonts.ROBOTO_400,
        fontSize: 14,
        lineHeight: 23.8,
        color: colors.PLACEHOLDER_TEXT_COLOR,
        textAlign: "center"
    },
    actionsWrapper: {
        width: "50%",
        height: 75,
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    author1: {
        position: "absolute",
        bottom: 0,
        right: -15,
        resizeMode: "contain",
        width: width / 3.07,
        height: width / 2.33
    },
    author2: {
        position: "absolute",
        bottom: 0,
        left: -15,
        width: 122,
        height: 161,
        resizeMode: "contain",
        width: width / 3.07,
        height: width / 2.33
    }
})

export default Podcast;