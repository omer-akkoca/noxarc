import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from "../consts/screens";
import { BrowsePodcasts, Podcast } from "../screens";

const Stack = createNativeStackNavigator();

const MainNav = () =>{Podcast
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ header: () => null }}
                initialRouteName={screens.BROWSE_PODCASTS}
            >
                <Stack.Screen name={screens.BROWSE_PODCASTS} component={BrowsePodcasts} />
                <Stack.Screen name={screens.PODCAST} component={Podcast} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNav;