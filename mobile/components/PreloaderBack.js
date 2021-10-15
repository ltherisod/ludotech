import React from 'react'
import {Dimensions, Image, ImageBackground} from 'react-native'

const PreloaderBack = () => {
    return (
        <ImageBackground style={{width:"100%", justifyContent:"center", alignItems:"center",height:Dimensions.get('screen').height}} source={{uri:"https://i.postimg.cc/0Q7FDTVz/fondoconfeti.png"}}>
            <Image style={{width:300, height:300, alignSelf:"center", position:'relative', bottom:48}} source={require("../assets/rubikPreloader.gif")}/>
        </ImageBackground>
    )
}

export default PreloaderBack