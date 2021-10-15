import React, { useState, useCallback, useRef } from "react"
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image, TouchableOpacity, Alert, Modal, Pressable } from 'react-native'
import HeroPages from '../components/HeroPages'
import { useArticle, useRelatedArticles } from '../hooks/articlesHooks'
import articlesActions from "../redux/actions/articlesActions"
import usersActions from "../redux/actions/usersActions"
import { connect } from "react-redux"
import YoutubePlayer from "react-native-youtube-iframe"
import ArticleCarousel from "../components/ArticleCarousel"
import MostRealted from "../components/MostRealted"
import Toast from 'react-native-toast-message';
import * as Animatable from 'react-native-animatable'

const Article = (props) => {

  const scrollRef = useRef()

  const [modalVisible, setModalVisible] = useState(false)
 
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
    videoId,
 } = article

 const [relatedArticles, loadingRelated] = useRelatedArticles(genres)

 const [playing, setPlaying] = useState(false)

 const onStateChange = useCallback((state) => {
  if (state === "ended") {
    setPlaying(false);
    Alert.alert("video has finished playing!");
  }
}, []);

 const addToCart = (e, id) => {
  if(props.user) {
    e.stopPropagation();
    props.updateCart("add", id);
    Toast.show({
      type: 'success',
      text1: `${name} added🤩`,
      text2: 'Press here to see your cart',
      onPress: () => props.navigation.navigate('cart'),
      position: 'bottom'
    })
  } else {
    Toast.show({
      type: 'error',
      text1: `You need to be logged 😢`,
      text2: 'Go to sign in now to add a product in your cart',
      position: 'bottom'
    })
  }
}
  return (
    <ScrollView  ref={scrollRef}>
      <ImageBackground style={{width:"100%", alignItems:"center"}} source={{ uri: "https://i.postimg.cc/0Q7FDTVz/fondoconfeti.png" }} resizeMode="cover">
        <HeroPages />
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

        <Animatable.View animation='fadeInLeft' style={{alignSelf:"flex-start", marginLeft:30}} >
          <ImageBackground style={styles.articleDecoImgOne} source={{ uri: `${decoPhotos ? decoPhotos[0] : [] }` }} >
          </ImageBackground>
        </Animatable.View>
        <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{description}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Game Description</Text>
      </Pressable>
    </View>
        <Animatable.View  animation='fadeInRight'>
          <ImageBackground style={styles.articleDecoImgTwo} source={{ uri: `${decoPhotos ? decoPhotos[1] : [] }` }} >
          </ImageBackground>
        </Animatable.View>
        <View style={{alignItems:"center", marginVertical:10}} >
          <YoutubePlayer
            height={300}
            width={350}
            play={playing}
            videoId={videoId}
            onChangeState={onStateChange}
          />
        </View>

        <View  animation='fadeInLeft' style={{alignSelf:"flex-start", marginTop:-50, marginLeft:30}} >
          <ImageBackground style={styles.articleDecoImgThree} source={{ uri: `${decoPhotos ? decoPhotos[2] : [] }` }} >
          </ImageBackground>
        </View>

        <MostRealted 
          relatedArticles={relatedArticles}
          articleId={props.route.params.id}
          navigation={props.navigation}
          scrollRef={scrollRef}
        />
        <View style={styles.backButtonContainer} >
          <TouchableOpacity>
            <View style={styles.backButton}>
              <Text
                style={styles.backButtonText}
                onPress={() => {
                props.navigation.navigate("ArticlesStack");
                }}
                >
                Go back to articles
                </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
      wishList: state.users.wishList,
      user: state.users.user
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

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#e561ae",
  },
  buttonClose: {
    backgroundColor: "#7c51b0",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "justify",
    fontFamily:"Poppins_600SemiBold",
    color:"gray",
  },
  backButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color:'red'
  },  
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    backgroundColor: '#660099',
    borderRadius: 80,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 10,
  },
  backButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16, 
    color: 'white' 
  },
  

})
