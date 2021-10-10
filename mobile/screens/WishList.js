import React from 'react'
 import { Image, StyleSheet, ImageBackground, ScrollView, Text} from 'react-native'
 import Footer from '../components/Footer'
 import HeroPages from '../components/HeroPages'

 const WishList = () =>{
     return(
        <ScrollView>
            <ImageBackground  style={{width:"100%"}} source={{ uri: "https://i.postimg.cc/4NwFMLWs/fondo-Violeta.png" }} resizeMode="cover">
                <HeroPages/>
                <Text>Wishlist asinoma para linkear</Text>
                <Footer/>
            </ImageBackground>
        </ScrollView>
     )
 }

 export default WishList