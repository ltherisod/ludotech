import React from "react"
import { ImageBackground, StyleSheet} from "react-native"
const HeroPages = () => {
    return(
        <ImageBackground source={require('../assets/herPages1.png')} style={styles.heroPagesBody}>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    heroPagesBody:{
        width:"100%",
        resizeMode:"cover",
        height:210,
        
    }
})

export default HeroPages