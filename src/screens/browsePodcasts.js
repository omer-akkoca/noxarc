import React, { useMemo, useState } from "react";
import { StyleSheet, View, Text, TextInput, Image, FlatList, Dimensions, TouchableHighlight } from "react-native";
import Logo from "../components/logo";
import Page from "../layouts/page";
import Single from "../components/podcasts/single";
import { colors } from "../assets/colors";
import { fonts } from "../assets/fonts";
import { authors, categories, episodes, podcasts, search, topics } from "../assets/images";
import { useQuery } from "react-query";
import { SEARCH_PODCAST } from "../utils/request";
import { getRandomImage } from "../consts/consts";

const { width } = Dimensions.get("screen")

const arr = [
    {
        title: "categories",
        image: categories 
    },
    {
        title: "topics",
        image: topics
    },
    {
        title: "authors",
        image: authors
    },
    {
        title: "podcasts",
        image: podcasts
    },
    {
        title: "episodes",
        image: episodes
    }
]

const BrowsePodcasts = () =>{

    const [text,setText] = useState("")
    const [category,setCategory] = useState("")

    const params = useMemo(() => (
        { 
            text: text.toLowerCase(), 
            limit: 5, 
            category 
        }
    ),[text, category])

    const { data } = useQuery(
        ["SEARCH_PODCAST",params],
        () => SEARCH_PODCAST(params).then(res => res.data),
        {
            onSuccess: (res) => null,
            onError: (err) => console.log(err),
            initialData: []
        }
    )

    const RenderItem = ({item,index}) => {
        return(
            <View 
                style={[
                    styles.itemWrapper,
                    index===0?{marginLeft: 35}:index===arr.length-1?{marginRight:35}:{}
                ]}
            >
                <View style={styles.itemImageWrapper}>
                    <Image source={item.image}/>
                </View>
                <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
        )
    }

    return(
        <Page bgColor={colors.DARK_BG}>
            <Logo size={42} customStyle={{marginLeft: 32, marginTop: 53}}/>
            <Text style={styles.title}>browse</Text>
            <View style={styles.searchInputWrapper}>
                <TextInput
                    value={text}
                    onChangeText={(text) => setText(text)}
                    placeholder="Search"
                    placeholderTextColor={colors.PLACEHOLDER_TEXT_COLOR}
                    style={styles.input}
                    autoFocus={false}
                />
                <Image source={search}/>
            </View>
            <FlatList
                data={arr}
                keyExtractor={(item)=> item.title}
                renderItem={({item,index}) => <RenderItem item={item} index={index}/>}
                horizontal
                style={{ marginTop: 32 }}
                showsHorizontalScrollIndicator={false}
            />
            <Text style={styles.listingTitle}>Podcasts{`(${data?.length})`}</Text>
            {
                /*
                    <FlatList
                        nestedScrollEnabled
                        data={data}
                        renderItem={({item,index})=> <Single key={index} podcast={item}/>}
                        style={{paddingHorizontal: 33, marginTop: 24}}
                    />
                */
            }
            <View style={{ paddingHorizontal: 33, marginTop: 24 }}>
                {
                    data?.map((item,i) => (
                        <Single key={i} podcast={item}/>
                    ))
                }
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.ROBOTO_700,
        fontSize: 48,
        color: colors.TITLE,
        lineHeight: 56.25,
        marginLeft: 33,
        marginTop: 35,
        textTransform: "capitalize",
        fontWeight: "700"
    },
    searchInputWrapper: {
        marginHorizontal: 32,
        marginTop: 32,
        backgroundColor: colors.SEARCH_INPUT_BG,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 11,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    input: {
        flex: 1,
        fontFamily: fonts.ROBOTO_500,
        fontSize: 14,
        lineHeight: 23.8,
        color: colors.INPUT_TEXT_COLOR,
        marginRight: 10
    },
    itemWrapper: {
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        marginRight: 22
    },
    itemImageWrapper: {
        width: width / 6.7,
        height: width / 6.7,
        backgroundColor: colors.CIRCLE_BG,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 99
    },
    itemTitle: {
        fontFamily: fonts.ROBOTO_500,
        fontSize: 12,
        lineHeight: 18,
        color:colors.INPUT_TEXT_COLOR,
        textTransform: "capitalize",
        marginTop: 16
    },
    listingTitle: {
        marginTop: 51,
        marginLeft: 34,
        fontSize: 16,
        fontFamily: fonts.ROBOTO_500,
        lineHeight: 18.75,
        color: colors.PLACEHOLDER_TEXT_COLOR
    }
})

export default BrowsePodcasts;