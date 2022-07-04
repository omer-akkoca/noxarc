import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from "../consts/screens";
import { Login } from "../screens";

const Stack = createNativeStackNavigator();

const AuthNav = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ header: () => null }}
            >
                <Stack.Screen name={screens.LOGIN} component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthNav;