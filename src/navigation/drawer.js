import React, { useEffect } from "react";
import { View } from "react-native";
import { useAtom } from "jotai";
import { USER_SIGNED_IN } from "../utils/atom";
import MainNav from "./main";
import AuthNav from "./auth";

const Router = () =>{

    const [userSignedIn] = useAtom(USER_SIGNED_IN)

    useEffect(()=>{
        // kayıtlı current token gonderıp ılk gırıste
        // token expired olmusmu degılmıu kontrolu
        // olmamıssa mainnava yonlendırelecek 
    })

    return(
        <View style={{ flex: 1 }}>
            { userSignedIn ? <MainNav/> : <AuthNav/> }
        </View>
    )
}

export default Router;