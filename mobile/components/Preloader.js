import React from 'react'
import {Image, View} from 'react-native'

const Preloader = () => {
    return (
        <View style={{width:"100%", justifyContent:"center", alignItems:"center"}}>
            <Image style={{width:200, height:200, alignSelf:"center"}} source={require("../assets/rubikPreloader.gif")}/>
        </View>
    )
}

export default Preloader