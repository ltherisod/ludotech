import React from 'react'
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native'
import HeroPages from '../components/HeroPages'

const WishList = () => {
  return (
    <ScrollView>
      <ImageBackground style={{width:"100%"}} source={require("../assets/fondoVioleta.png")} resizeMode="cover">
        <HeroPages />
        <View style={styles.wishListContainer} >
          <Text style={styles.wishListContainerTitle} >If you have a lot of products in your wishlist, you can search each one of them here</Text>
          
        </View>
      </ImageBackground>
    </ScrollView>
  )
}

export default WishList

const styles = StyleSheet.create({
  wishListContainer: {
    minHeight: 500,
  }

})
