import React from 'react'
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native'
import HeroPages from '../components/HeroPages'
import { useArticle, useRelatedArticles } from '../hooks/articlesHooks'


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

 const addToCart = (id) => {
  props.updateCart("add", id)
}

  return (
    <ScrollView>
      <ImageBackground style={{width:"100%"}} source={require("../assets/fondoVioleta.png")} resizeMode="cover">
        <HeroPages />
        <View style={styles.articlePresentation} >
          {/* photos carousel */}
          <View style={styles.articleCard} >
            <Text style={styles.articleCardTitle} >{name}</Text>
            <View style={styles.articleCardBrand} >
              <Text style={styles.articleCardBrandText} >{brand ? brand.name.toUpperCase() : ''}</Text>
            </View>
            {hasDiscount === false ? (
              <Text style={styles.articleCardPriceText} >${price} USD</Text>
            ) : (
              <View style={styles.articleCardPrice}>
                <Text style={styles.articleCardPriceText} >${price} USD</Text>
                <Text style={styles.articleCardDiscountText} >{discountPrice}</Text>
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
                <Text style={styles.articleCardStatsTextLeftTextGameType}>{gameType ? gameType.name : ''}</Text>
                <Text style={styles.articleCardStatsTextLeftTextSize}>Size: {size}</Text>
                <Text style={styles.articleCardStatsTextLeftTextWeight}>Weight: {weight}</Text>
                <Text style={styles.articleCardStatsTextLeftTextVisits}>Visits: {visitsCount}</Text>
              </View>
              <View style={styles.articleCardStatsTextLeft}>
                <Text style={styles.articleCardStatsTextLeftTextDivision}>|</Text>
                <Text style={styles.articleCardStatsTextLeftTextDivision}>|</Text>
                <Text style={styles.articleCardStatsTextLeftTextDivision}>|</Text>
                <Text style={styles.articleCardStatsTextLeftTextDivision}>|</Text>
              </View>
              <View style={styles.articleCardStatsTextLeft}>
                <Text style={styles.articleCardStatsTextLeftTextPlayingTime}>🕘  {playingTime} min</Text>
                <Text style={styles.articleCardStatsTextLeftTextPlayers}>🎮  {minPlayers} - {maxPlayers}</Text>
                <Text style={styles.articleCardStatsTextLeftTextMinAge}>👦 {minAge} +</Text>
                <Text style={styles.articleCardStatsTextLeftTextStock}>Stock: {stock}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.articleCardAddCartButton} onPress={() => Alert.alert('va pal carrito')}>
              <Image style={styles.articleCardaddCartIcon} source={require("../assets/buy.png")} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.articleDecoOne} >
          <ImageBackground style={styles.articleDecoImgOne} source={{ uri: `${decoPhotos ? decoPhotos[0] : [] }` }} >
          </ImageBackground>
        </View>
        
        <View style={styles.articleDescription}>
          <Text style={styles.articleDescriptionText} >{description}</Text>
        </View>
        
        <View style={styles.articleDecoTwo} >
          <ImageBackground style={styles.articleDecoImgTwo} source={{ uri: `${decoPhotos ? decoPhotos[1] : [] }` }} >
          </ImageBackground>
        </View>

        <View style={styles.articleVideo} >
          <Text style={styles.articleVideoText} >ACA VA EL VIDEO ???</Text>
        </View>

        <View style={styles.articleDecoThree} >
          <ImageBackground style={styles.articleDecoImgThree} source={{ uri: `${decoPhotos ? decoPhotos[2] : [] }` }} >
          </ImageBackground>
        </View>
        
      </ImageBackground>
    </ScrollView>
  )
}

export default Article

const styles = StyleSheet.create({
  articleCard: {
    minHeight: 130,
  },
  articleCardStats: { 
    flexDirection: 'row',
  },
  articleDecoImgOne: {
    width: 100,
    height: 100
  },
  articleDecoImgTwo: {
    width: 100,
    height: 100
  },
  articleDecoImgThree: {
    width: 100,
    height: 100
  },
})
