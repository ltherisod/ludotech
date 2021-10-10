import React from "react"
import Footer from "../components/Footer"
import HeroPages from "../components/HeroPages"
import { ImageBackground, Text, View, Image} from "react-native"

const Profile = () => {
   

   return (
    
         <ImageBackground style={{width:"100%", minHeight:400}} source={{uri: "https://i.postimg.cc/3wVXYt59/back-Ludo3.png"}}>
            <HeroPages />
            <View>
                <Text>Welcome!</Text>
                <Image source={require('../assets/twitter.png')}/>
            </View>
             <Footer />
         </ImageBackground>
      
   )
}

export default Profile