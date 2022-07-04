import React from "react"
import { StyleSheet, SafeAreaView } from "react-native"
import Router from "./src/navigation/drawer"
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const App = () =>{
    return(
        <QueryClientProvider client={queryClient}>
            <SafeAreaView style={styles.wrapper}>
                <Router/>
            </SafeAreaView>
        </QueryClientProvider>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    }
})

export default App;