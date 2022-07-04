import React from "react";
import { ScrollView, StatusBar, View, Dimensions } from "react-native";

const { height } = Dimensions.get("screen")

const Page = ({ bgColor = "#ffffff", children }) =>{
    return(
        <>
            <StatusBar hidden/>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, minHeight: height, backgroundColor: bgColor }}>
                    { children }
                </ScrollView>
            </View>
        </>
    )
}

export default Page;