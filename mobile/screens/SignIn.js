import React from "react"
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import {View, Text, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Dimensions} from "react-native"
import Header from "../components/Header"
import Footer from "../components/Footer"

const SignIn = (props) => {
    return (
        <SafeAreaView style={{marginTop: Platform.OS === "android" && StatusBar.currentHeight, flex: 1}}>
            <ScrollView>
                <Header/>
                <View style={styles.SignInMain}>
                    <Text>Sign In</Text>
                </View>
                <Footer/>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapDispatchToProps = {
    loginUser: usersActions.logInOrSignUp
}

export default connect(null, mapDispatchToProps)(SignIn)

const {height} = Dimensions.get("window")
const styles = StyleSheet.create({
    SignInMain: {
        minHeight: height-StatusBar.currentHeight,
    },
})