import React from 'react'
import { StyleSheet, Image, View, ImageBackground, Text } from 'react-native'
import Carousel from 'react-native-snap-carousel'

const ArticleCarousel = (props) => {
    const {photosArticle} = props
    const renderItem = ({ item }) => {
        return (
            <View  style={styles.slide} >
                <Image source={{uri: item }} style={styles.image} alt="gameimage"/>
            </View >
        )
    }   
 
    return (
        <View style={styles.containerCarousel}>
        <Carousel
            data={photosArticle}
            sliderWidth={900}
            itemWidth={450}
            renderItem={renderItem}
            layout={"default"}
            loop={true}
            autoplay={true}
        />
    </View>
    )
}

export default ArticleCarousel
const styles = StyleSheet.create({

    image: {
        alignSelf:"center",
        resizeMode:"cover",
        height: 300,
        width: 300,
    },
    containerCarousel: {
        width:"100%",
        marginBottom: 20,
        alignItems:"center",
        justifyContent:"center",
    },
    slide:{
        width:"100%",
    },
})
   
