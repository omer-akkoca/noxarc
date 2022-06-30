import React from "react"
import { StyleSheet, SafeAreaView } from "react-native"
import Navigator from "./src/navigation/drawer"

const App = () =>{
    return(
        <SafeAreaView style={styles.wrapper}>
            <Navigator/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default App;