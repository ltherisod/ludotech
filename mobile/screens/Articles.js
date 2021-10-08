import React from "react"
import {View, Text, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Dimensions} from "react-native"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Articles = (props) => {
    return (
        <SafeAreaView style={{marginTop: Platform.OS === "android" && StatusBar.currentHeight, flex: 1}}>
            <ScrollView>
                <Header/>
                <View style={styles.articlesMain}>
                    <Text>Articles</Text>
                </View>
                <Footer/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Articles

const {height} = Dimensions.get("window")
const styles = StyleSheet.create({
    articlesMain: {
        minHeight: height-StatusBar.currentHeight,
    },
})