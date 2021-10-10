import React from "react"
import {View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet, Dimensions} from "react-native"

const Footer = () => {
    return(
        <ImageBackground source={require('../assets/footer1.png')} style={styles.footerContainer}>
            <View style={styles.socialMediaContainer} >
            </View>
            <Text style={styles.footerRights}>LudoTech © All rights reserved  || Mindhub 2021</Text>
        </ImageBackground>
    )
}

export default Footer


const styles = StyleSheet.create({
    footerContainer: {
        width: "100%",
        height: 300,
        resizeMode:"cover",
        justifyContent:"flex-end"

    },
    socialMediaContainer: {
        alignSelf:"center",
        flexDirection:"row"
    },
    footerRights: {
        paddingVertical:10,
        fontSize:12,
        textAlign:"center",
        color:"white",
        fontFamily:"Poppins_700Bold"
    },
    footerIcon:{
        width:28,
        height:28,
        marginLeft:10,
    }
})