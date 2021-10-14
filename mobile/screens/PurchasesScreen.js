import React from 'react'
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import HeroPages from '../components/HeroPages'

const PurchasesScreen = () => {
  return (
    <ScrollView>
      <ImageBackground
        style={{ width: "100%", minHeight: 400 }}
        source={{ uri: "https://i.postimg.cc/0Q7FDTVz/fondoconfeti.png" }}
      >
        <HeroPages />
        <Text style={styles.profileTittle}>Profile</Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 15,
          }}
        ></View>
      </ImageBackground>
    </ScrollView>
  )
}

export default PurchasesScreen

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})
