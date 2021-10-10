import React from "react"
import {View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet, Pressable} from "react-native"
import { connect } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"
import Icon from 'react-native-vector-icons/FontAwesome'
const Article = (props) => {
    const addToCart = (e, id) => {
        e.stopPropagation()
        props.updateCart("add", id)
     }

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
            <Pressable>
                <Icon name='heart' style={{fontSize:30, color:"pink", alignSelf:"flex-end", margin:10}}/>
            </Pressable>
            <Image source={{uri: iconPhotos }} resizeMode="cover" style={styles.articleIcon}/>
            <Text style={styles.articlePrice}>${price} USD</Text>
            <Text style={styles.articleName}>{name}</Text>
            <Pressable onPress={(e) => addToCart(e, _id) }>
                <Image style={styles.cart} source={require("../assets/buy.png")}/>
            </Pressable>
            
        </ImageBackground>
    )
}

const mapDispatchToProps = {
    updateCart: articlesActions.updateCart,
 }
 
 export default connect(null, mapDispatchToProps)(Article)

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
    },
    articlePrice:{
        fontFamily:"Poppins_700Bold",
        alignSelf:"center",
        color:"lightgreen",
        fontSize:20
    },
    cart:{
        marginRight:15,
        alignSelf:"flex-end",
        width:45,
        height:45,
    }
})