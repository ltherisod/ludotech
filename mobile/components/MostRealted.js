import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { ImageBackground, Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import articlesActions from '../redux/actions/articlesActions'
import Toast from 'react-native-toast-message'

const MostRealted = ({relatedArticles, articleId, navigation, scrollRef}) => {

    const user = useSelector((state) => state.users.user)
    const dispatch = useDispatch()

    const addToCart = (e, id, value) => {
        if(user) {
            e.stopPropagation();
            dispatch(articlesActions.updateCart("add", id))
            Toast.show({
              type: 'success',
              text1: `${value} added🤩`,
              text2: 'Press here to see your cart',
              onPress: () => navigation.navigate('cart'),
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
    
    const relatedArticlesNoRepeat = relatedArticles.filter(
        (arti) => arti._id != articleId
    )

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('ArticleStack', { id: item._id })
                scrollRef.current.scrollTo({ y: 0, animated: true })
            }}>
                <ImageBackground imageStyle={{ borderRadius: 10}} style={styles.bg} source={{uri: 'https://i.postimg.cc/sftdwcnd/article.png'}}>
                    <Image style={styles.photo} source={{uri: item.photos[0]}} />
                    <Text style={styles.price}>${item.price}.00 USD</Text>
                    <View style={styles.flex}>
                        <Text style={styles.name}>{item.name}</Text>
                        <TouchableOpacity onPress={(e) => addToCart(e, item._id, item.name)}>
                            <Image style={styles.cart} source={require("../assets/buy.png")} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }   

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.most}>Products</Text>
                <Text style={styles.related}>{` `}related</Text>
                <Text style={styles.most}>{` `}!</Text>
            </View>
            <Carousel
                layout='default'
                data={relatedArticlesNoRepeat}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={250}
                itemHeight={250}
                renderItem={renderItem}
                activeSlideAlignment='start'
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                slideStyle={{marginRight: 10}}
                loop={true}
                autoplay={true}
            />
        </View>
    )
}

export default MostRealted

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    most: {
        color: '#FF9424',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    related: {
        color: '#67F2CB',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    bg: {
        padding: 20,
        backgroundColor: 'white',
        width: 250,
        height: 250,
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
        color: 'green',
        fontSize: 16,
        fontWeight: '600'
    },
    name: {
        flex: 1,
        color: 'gray',
        fontSize: 18,
        fontWeight: '600'
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
