import React from 'react'
import {Image, ImageBackground} from 'react-native'

const PreloaderBack = () => {
    return (
        <ImageBackground style={{width:"100%", justifyContent:"center", alignItems:"center", flex:1}} source={{uri:"https://i.postimg.cc/0Q7FDTVz/fondoconfeti.png"}}>
            <Image style={{width:300, height:300, alignSelf:"center"}} source={require("../assets/rubikPreloader.gif")}/>
        </ImageBackground>
    )
}

export default PreloaderBack