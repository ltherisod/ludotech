import React from "react"
import {View, ImageBackground, Text, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Dimensions} from "react-native"

const Home = () => {
    return (
        <SafeAreaView style={{marginTop: Platform.OS === "android" && StatusBar.currentHeight, flex: 1}}>
            <ScrollView>
                <View style={styles.homeMain}>
                <Text>Home</Text>
                </View>
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