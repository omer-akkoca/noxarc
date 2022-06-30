import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from "../consts/screens";
import { BrowsePodcasts, Login, Podcast } from "../screens"

const Stack = createNativeStackNavigator();

const RenderMain = () =>{
    return(
        <NavigationContainer>
            <DrawerNavigation/>
        </NavigationContainer>
    )
}

const DrawerNavigation = () => {
    return(
        <Stack.Navigator
            initialRouteName={screens.LOGIN}
            screenOptions={{ header: () => null }}
        >
            <Stack.Screen name={screens.LOGIN} component={Login} />
            <Stack.Screen name={screens.BROWSE_PODCASTS} component={BrowsePodcasts} />
            <Stack.Screen name={screens.PODCAST} component={Podcast} />
        </Stack.Navigator>
    )
}

export default RenderMain;