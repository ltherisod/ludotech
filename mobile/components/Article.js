import React from "react"
import {View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet} from "react-native"

const Article = (props) => {

    const {
        name,
        photos,
        price,
        hasDiscount,
        genres,
        gameType,
        minAge,
        _id,
        discountPrice,
        iconPhotos
     } = props.article
     
    return(
        <ImageBackground  style={styles.articleCard}source={{uri:"https://i.postimg.cc/sftdwcnd/article.png"}} imageStyle={{borderRadius:15}}>
            <Image source={{uri: iconPhotos }} resizeMode="cover" style={styles.articleIcon}/>
            <Text>${price}</Text>
            <Text style={styles.articleName}>{name}</Text>
        </ImageBackground>
    )
}

export default Article

const styles = StyleSheet.create({
    articleCard:{
        width:300,
        minHeight:200,
        margin:5,
        padding:5,
        alignSelf:"center"
    },
    articleIcon:{
        width:200,
        height:200,
        alignSelf:"center"
    },
    articleName:{
        fontFamily:"Poppins_700Bold",
        textAlign:"center",
        fontSize:20,

    }
})