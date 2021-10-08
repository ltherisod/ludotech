import React from "react"
import {View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet, Dimensions} from "react-native"

const Footer = () => {
    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/90sJmPWq/footer.png"}} style={styles.footerContainer}>
            <View style={styles.socialMediaContainer} >
                <TouchableOpacity style={styles.socialMediaButtom} onPress={() => {Linking.openURL("https://www.instagram.com")}}>
                    <Image style={styles.footerInsta} source={{uri: "instagram.png"}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialMediaButtom} onPress={() => {Linking.openURL("https://www.facebook.com")}}>
                    <Image style={styles.footerFace} source={{uri: "facebook.png"}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialMediaButtom} onPress={() => {Linking.openURL("https://www.twitter.com")}}>
                    <Image style={styles.footerTwit} source={{uri: "twitter.png"}} />
                </TouchableOpacity>
            </View>
            <Text style={styles.footerRights}>LudoTech © All rights reserved  || Mindhub 2021</Text>
        </ImageBackground>
    )
}

export default Footer

const {height} = Dimensions.get("window")
const styles = StyleSheet.create({
    footerContainer: {
        width: "100%",
        height: height*0.69,
    },
    socialMediaContainer: {

    },
    footerRights: {

    },
    socialMediaButtom: {

    },
    footerInsta: {

    },
    footerFace: {

    },
    footerTwit: {

    }
})