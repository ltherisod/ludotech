import React from "react"
import {
   StyleSheet,
   Text,
   ScrollView,
   View,
   ImageBackground,
   Image
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Footer from "../components/Footer"
import HeroPages from "../components/HeroPages"

const NotWishlist = (props) => {
   return (
      <ScrollView>
         <ImageBackground
            style={{ width: "100%", flex: 1 }}
            source={{uri:"https://i.postimg.cc/0Q7FDTVz/fondoconfeti.png"}}
            resizeMode="cover"
         >
            <HeroPages />
            <View style={styles.container}>
               <View style={{width:360}}>
                  <Text style={styles.title}>You must have an account to have a <Text style={{color: "#67f2cb"}}>Wishlist!</Text></Text>
               </View> 
               <Image style={{width:150, height:150}}source={{uri: "https://i.postimg.cc/Vk3Rk1tF/robot-Magic.png"}}/>    
               <TouchableOpacity
                  style={{
                     borderWidth: 1,
                     borderColor: "rgba(0,0,0,0.2)",
                     marginBottom: 20,
                     borderRadius: 6,
                  }}
                  onPress={() => props.navigation.navigate("SignUpStack")}
               >
                  <ImageBackground
                     style={styles.button}
                     imageStyle={{ borderRadius: 5 }}
                     source={{
                        uri: "https://i.postimg.cc/mD7r09R8/button-Back.png",
                     }}
                  >
                     <Text style={styles.textButton}>Sign up</Text>
                  </ImageBackground>
               </TouchableOpacity>
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
      alignItems: "center",
      paddingVertical: "9%",
      flex: 1,
   },
   title: {
      fontFamily:"Poppins_700Bold",
      fontSize: 25,
      marginBottom: 30,
      color: "purple",
      textAlign:'center'
   },
   button: {
      paddingVertical: 10,
      width: 150,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
    
   },
   textButton: {
      fontSize: 20,
      color: "white",
      fontWeight: "bold",
   },
})
