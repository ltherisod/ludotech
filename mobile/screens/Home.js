import React from "react"
import {View, Text, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Dimensions} from "react-native"
import Header from "../components/Header"
import Footer from "../components/Footer"


const Home = () => {
    return (
        <SafeAreaView style={{marginTop: Platform.OS === "android" && StatusBar.currentHeight, flex: 1}}>
            <ScrollView>
                <Header/>
                <View style={styles.homeMain}>
                    <Text>Home</Text>
                </View>
                <Footer/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const {height} = Dimensions.get("window")
const styles = StyleSheet.create({
    homeMain: {
        minHeight: height-StatusBar.currentHeight,
    },
})