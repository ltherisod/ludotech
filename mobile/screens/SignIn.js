import React from "react"
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import {View, Text, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Dimensions} from "react-native"

const SignIn = (props) => {
    return (
        <SafeAreaView style={{marginTop: Platform.OS === "android" && StatusBar.currentHeight, flex: 1}}>
            <ScrollView>
                <View style={styles.SignInMain}>
                <Text>Sign In</Text>
                </View>
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