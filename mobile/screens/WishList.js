import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, View, ScrollView, ImageBackground, TextInput, FlatList, TouchableOpacity } from 'react-native'
import HeroPages from '../components/HeroPages'
import Article from '../components/Article'

const WishList = (props) => {

  const wishList = useSelector((state) => state.users.wishList)
  const [searched, setSearched] = useState([])

  useEffect(() => {
    setSearched(wishList)
  }, [wishList])

  const inputFilterHandler = (e) => {
    setSearched(wishList.filter(product => product.name.replace(/ /g, '').toUpperCase().startsWith(e.nativeEvent.text.replace(/ /g, '').toLowerCase())))
  }

  return (
    <ScrollView>
      <ImageBackground style={{width:"100%"}} source={require("../assets/fondoVioleta.png")} resizeMode="cover">
        <HeroPages />
        <View style={styles.wishListContainer} >
          <Text style={styles.wishListContainerTitle} >If you have a lot of products in your wishlist, you can search each one of them here</Text>
          <View style={styles.wishListContainerBox}>
            <TextInput
              style={styles.wishListContainerInput}
              onChange={inputFilterHandler}
              placeholder='Search for products'
              />
          </View>
          <View>
            <View style={styles.wishListArticles} >
              <FlatList 
                data={searched}
                keyExtractor={(product) => product._id}
                renderItem={( product => (
                    <TouchableOpacity onPress={() => props.navigation.navigate('ArticleStack', { id: product.item._id })}>
                      {console.log("en la lsita", product)}
                      <Article 
                        article={product.item} 
                        history={props.history} 
                        key={product.item._id} />
                    </TouchableOpacity>
                    )
                )}
              />

            </View>
          </View>
          
        </View>
      </ImageBackground>
    </ScrollView>
  )
}

export default WishList

const styles = StyleSheet.create({
  wishListContainer: {
    minHeight: 500,
  },

  wishListContainerInput: {
    width: '50%',
    height: 20,
    backgroundColor: 'white',
  },


})
