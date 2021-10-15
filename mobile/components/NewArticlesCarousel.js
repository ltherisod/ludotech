import React, { useState, useEffect }from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import Swiper from 'react-native-swiper'
import { connect, useSelector } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"
import Toast from 'react-native-toast-message'


const NewArticlesCarousel = (props) => {

  const [lastArticles, setLastArticles] = useState([])
  const user = useSelector((state) => state.users.user)

  useEffect (() => {
    async function getLastArticles() {
      try {
        let response = await props.getLastArticles()
        setLastArticles(response.response)
      } catch (e) {
        console.log(e)
      }
    }
    getLastArticles()
     // eslint-disable-next-line
  }, [])

  const addToCart = (e, id, name) => {
    if(user) {
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
    <>
      <View style={styles.containerTitle} >
          <Text style={styles.mainTextSpan}>Newest</Text>
          <Text style={styles.mainText}>{' '}Products</Text> 
        </View>
      <View style={styles.container}>
        <Swiper style={styles.swiperTag} 
          height={'100%'} 
          loop={true}
          autoplay={true} 
          showsPagination={false} 
          showsButtons={false}
          spaceBetween={0} 

        >
          {lastArticles.map((article, index) => ( 
            <TouchableOpacity key={`slide-${index}`} onPress={() => {
              props.navigation.navigate('ArticleStack', { id: article._id })}}
            >
              <ImageBackground imageStyle={{ borderRadius: 10}} style={styles.bg} source={{uri: 'https://i.postimg.cc/FRMgBC4D/ar2ticlecard.png'}}>
                <Image style={styles.photo} source={{uri: article.iconPhotos }} />
                <Text style={styles.price}>${article.price}.00 USD</Text>
                <View style={styles.flex}>
                  <Text style={styles.name}>{article.name}</Text>
                  <TouchableOpacity onPress={(e) => addToCart(e, article._id, article.name)}>
                    <Image style={styles.cart} source={require("../assets/buy.png")} />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </Swiper>
        
      </View>
    </>
  )
}

const mapDispatchToProps = {
  getLastArticles: articlesActions.getLastArticles,
  updateCart: articlesActions.updateCart,

}

export default connect(null, mapDispatchToProps)(NewArticlesCarousel)

const styles = StyleSheet.create({
  containerTitle: {
    flexDirection: "row",
    marginVertical: '20%'
  },
  mainText: {
    color: "white",
    fontSize: 40,
    paddingTop: 20,
    alignSelf: 'center',
    fontFamily: 'Poppins_700Bold'
  },
  mainTextSpan: {
    color: '#ff9424',
    fontSize: 40,
    paddingTop: 20,
    alignSelf: 'center',
    fontFamily: 'Poppins_700Bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    /* marginHorizontal: '17%', */
  },
  swiperTag: {
    overflow: 'visible',
    paddingHorizontal: '17%',
  },

  bg: {
    padding: 20,
    backgroundColor: 'white',
    width: 300,
    height: 300,
    resizeMode: 'cover',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.25,
    shadowRadius: 6.00,
    elevation: 24,
    borderTopWidth: 1,
    borderRadius: 10,
    borderTopColor: 'rgba(0,0,0,0.08)'
  },
  photo: {
      width: '70%',
      height: '70%',
      marginBottom: 10
  },
  price: {
      color: 'lightgreen',
      fontSize: 16,
      fontFamily:'Poppins_700Bold'
  },
  name: {
      flex: 1,
      color: 'gray',
      fontSize: 18,
      fontFamily:'Poppins_700Bold'
  },
  cart: {
      // marginRight: 10,
      width: 35,
      height: 35,
  },
  flex: {
      flexDirection: 'row',
      alignItems: 'center'
  }
})
