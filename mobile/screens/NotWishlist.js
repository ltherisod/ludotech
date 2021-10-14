import React from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Footer from '../components/Footer'
import HeroPages from '../components/HeroPages'

const NotWishlist = (props) => {
    return (
        <ScrollView>
            <ImageBackground style={{width:"100%", flex: 1}} source={require("../assets/fondoVioleta.png")} resizeMode="cover">
                <HeroPages />
                <View style={styles.container}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.title}>See your</Text>
                        <Text style={[styles.title, {color: "#67f2cb",}]}>{` `}wishlist</Text>
                    </View>
                    {/* <TouchableOpacity style={{borderWidth: 1, borderColor: 'rgba(0,0,0,0.2)', marginBottom: 20, borderRadius: 6}} onPress={() => props.navigation.navigate('SignInStack')}>
                        <ImageBackground  style={styles.button} imageStyle={{borderRadius: 5}} source={{uri: 'https://i.postimg.cc/mD7r09R8/button-Back.png'}}>
                            <Text style={styles.textButton}>Log in</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderWidth: 1, borderColor: 'rgba(0,0,0,0.2)', marginBottom: 20, borderRadius: 6}} onPress={() => props.navigation.navigate('SignUpStack')}>
                        <ImageBackground  style={styles.button} imageStyle={{borderRadius: 5}} source={{uri: 'https://i.postimg.cc/mD7r09R8/button-Back.png'}}>
                            <Text style={styles.textButton}>Sign up</Text>
                        </ImageBackground>
                    </TouchableOpacity> */}
                </View>
                <Footer />
            </ImageBackground>
        </ScrollView>
    )
}

export default NotWishlist

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // paddingHorizontal:'10%',
        alignItems: 'center',
        paddingVertical: '9%',
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 30,
        color: 'white'
    },
    button: {
        paddingVertical: 20,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5
    },
    textButton: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
})
