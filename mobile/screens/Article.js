import React, { useState, useCallback, useRef } from "react"
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image, TouchableOpacity, Alert, Button } from 'react-native'
import HeroPages from '../components/HeroPages'
import { useArticle, useRelatedArticles } from '../hooks/articlesHooks'
import articlesActions from "../redux/actions/articlesActions"
import usersActions from "../redux/actions/usersActions"
import { connect } from "react-redux"
import YoutubePlayer from "react-native-youtube-iframe"
import ArticleCarousel from "../components/ArticleCarousel"
const Article = (props) => {

  const [article, loading] = useArticle(props.route.params.id)
  const {
    brand,
    decoPhotos,
    description,
    discountPrice,
    gameType,
    genres,
    hasDiscount,
    maxPlayers,
    minAge,
    minPlayers,
    name,
    photos,
    playingTime,
    price,
    size,
    stock,
    video,
    visitsCount,
    weight,
    _id,
 } = article

 const [playing, setPlaying] = useState(false)

 const onStateChange = useCallback((state) => {
  if (state === "ended") {
    setPlaying(false);
    Alert.alert("video has finished playing!");
  }
}, []);

 const addToCart = (e, id) => {
  e.stopPropagation()
  props.updateCart("add", id)
}
  return (
    <ScrollView>
      <ImageBackground style={{width:"100%", alignItems:"center"}} source={{ uri: "https://i.postimg.cc/0Q7FDTVz/fondoconfeti.png" }} resizeMode="cover">
        <HeroPages />
        {/* <Image source={{uri: photos[0]}} style={{width:300, height:300}}/> */}
          <ArticleCarousel photosArticle={photos}/>
        <View style={styles.articlePresentation} >
          <View style={styles.articleCard} >
            <Text style={styles.articleCardTitle} >{name}</Text>
            <View style={styles.articleCardBrand} >
              <Text style={styles.articleCardBrandText} >{brand ? brand.name.toUpperCase() : ''}</Text>
            </View>
            {hasDiscount === false ? (
              <Text style={styles.articleCardPriceTextOne} >${price} USD</Text>
            ) : (
              <View style={{flexDirection:"row", alignItems:"center", alignSelf:"center"}}>
                <Text style={styles.articleCardPriceText} >${price} </Text>
                <Text style={styles.articleCardDiscountText} >${discountPrice} USD</Text>
              </View>
            )}
            {genres ? (
              genres.map(genre => (
                <Text style={styles.articleCardGenreText} key={genre._id}>{genre.name}</Text>
              ))
            ) : (
              <Text style={styles.articleCardGenreText}>No genre</Text>
            )}
            <View style={styles.articleCardStats}>
              <View style={styles.articleCardStatsTextLeft}>
                <Text style={styles.articleCardStatsTextLeftText}>{gameType ? gameType.name : ''}</Text>
                <Text style={styles.articleCardStatsTextLeftText}>Size: {size}</Text>
                <Text style={styles.articleCardStatsTextLeftText}>Weight: {weight}</Text>
                <Text style={styles.articleCardStatsTextLeftText}>Visits: {visitsCount}</Text>
              </View>
              <View style={styles.articleCardStatsTextLeft}>
                <Text style={styles.articleCardStatsTextLeftTextDivision}>|</Text>
                <Text style={styles.articleCardStatsTextLeftTextDivision}>|</Text>
                <Text style={styles.articleCardStatsTextLeftTextDivision}>|</Text>
                <Text style={styles.articleCardStatsTextLeftTextDivision}>|</Text>
              </View>
              <View style={styles.articleCardStatsTextLeft}>
                <Text style={styles.articleCardStatsTextLeftText}>🕘  {playingTime} min</Text>
                <Text style={styles.articleCardStatsTextLeftText}>🎮  {minPlayers} - {maxPlayers}</Text>
                <Text style={styles.articleCardStatsTextLeftText}>👦 {minAge} +</Text>
                <Text style={styles.articleCardStatsTextLeftText}>Stock: {stock}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.articleCardAddCartButton} onPress={(e) => addToCart(e, _id) }>
              <Image style={styles.articleCardaddCartIcon} source={require("../assets/buy2.png")} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{alignSelf:"flex-start", marginLeft:30}} >
          <ImageBackground style={styles.articleDecoImgOne} source={{ uri: `${decoPhotos ? decoPhotos[0] : [] }` }} >
          </ImageBackground>
        </View>
        
        <View style={styles.articleDescription}>
          <Text style={styles.articleDescriptionText} >{description}</Text>
          <ImageBackground style={styles.articleDecoImgTwo} source={{ uri: `${decoPhotos ? decoPhotos[1] : [] }` }} >
          </ImageBackground>
        </View>
        

        <View style={{alignItems:"center", marginVertical:10}} >
           <YoutubePlayer
        height={300}
        width={350}
        play={playing}
        videoId={"emlI43ZE9-c"}
        onChangeState={onStateChange}
      />
        </View>

        <View style={{alignSelf:"flex-start", marginTop:-50, marginLeft:30}} >
          <ImageBackground style={styles.articleDecoImgThree} source={{ uri: `${decoPhotos ? decoPhotos[2] : [] }` }} >
          </ImageBackground>
        </View>
        
      </ImageBackground>
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
      wishList: state.users.wishList,
  }
}

const mapDispatchToProps = {
  updateCart: articlesActions.updateCart,
  toggleWishList: usersActions.toggleWishList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)

const styles = StyleSheet.create({
  articleCard: {
    minHeight: 130,
    borderRadius:10,
    padding:20,
    backgroundColor:"white",
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 6.00,
    elevation: 24,
  },
  articleCardStats: { 
    flexDirection: 'row',
    alignSelf:"center"
  },
  articleDecoImgOne: {
    width: 100,
    height: 100,
    alignSelf:"flex-start"
  },
  articleDecoImgTwo: {
    width: 100,
    height: 100,
    alignSelf:"flex-end"
  },
  articleDecoImgThree: {
    width: 100,
    height: 100
  },
  articlePresentation:{
    flexDirection:"row",
    alignItems:"center"
  },
  articleCardaddCartIcon:{
    width:80,
    height:25,
    alignSelf:"center",
    marginTop:10,
    borderRadius:3,
    marginLeft:20
  },
  articleCardTitle:{
    textAlign:"center",
    fontFamily:"Poppins_600SemiBold",
    fontSize:18
  },
  articleCardBrandText:{
    textAlign:"center",
    fontFamily:"Poppins_600SemiBold",
    color:"gray",
    letterSpacing:.5,
  },
  articleCardPriceText:{
    fontFamily:"Poppins_700Bold",
    color:"gray",
    textDecorationLine: 'line-through',
    fontSize:15
  },
  articleCardPriceTextOne:{
    fontFamily:"Poppins_700Bold",
    color:"lightgreen",
    alignSelf:"center"
  },
  articleCardDiscountText:{
    fontFamily:"Poppins_700Bold",
    color:"lightgreen",
    fontSize:16
  },
  articleCardGenreText:{
    alignSelf:"center",
    marginTop:-10,
    fontFamily:"Poppins_600SemiBold",
    color:"gray",
    fontSize:12
  },
  articleCardStatsTextLeftText:{
    fontFamily:"Poppins_600SemiBold",
    color:"gray",
    marginHorizontal:10
  },
  articleCardStatsTextLeftTextDivision:{
    fontFamily:"Poppins_600SemiBold",
    color:"gray",
    marginHorizontal:10
  },
  articleDescriptionText:{
    textAlign:"justify",
    fontFamily:"Poppins_600SemiBold",
    color:"gray",
    marginHorizontal:25,
    fontSize:20

  }

  

})
