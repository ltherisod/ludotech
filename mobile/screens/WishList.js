import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, View, ScrollView, ImageBackground, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import HeroPages from '../components/HeroPages'
import Article from '../components/Article'
import Footer from '../components/Footer'

const WishList = (props) => {

  const wishList = useSelector((state) => state.users.wishList)
  const [searched, setSearched] = useState([])

  useEffect(() => {
    setSearched(wishList)
  }, [wishList])

  const inputFilterHandler = (e) => {
    setSearched(wishList.filter(product => product.name.replace(/ /g, '').toLowerCase().startsWith(e.nativeEvent.text.replace(/ /g, '').toLowerCase())))
  }

  return (
    <ScrollView>
      <ImageBackground style={{width:"100%"}} source={require("../assets/fondoVioleta.png")} resizeMode="cover">
        <HeroPages />
        {searched.length === 0 
        ? (
          <>
            <View style={{width:"100%", justifyContent:"center", alignItems:"center"}}>
               <Text style={styles.title}>Your Wishlist <Text style={{color: "#67f2cb"}}>empty!</Text></Text>
                <Text style={styles.title}>Let's <Text style={{color: "#67f2cb"}}>start</Text> searching!</Text>
                <Image style={{width:250, height:250, alignSelf:"center"}} source={require("../assets/mascotSearch.gif")}/>
                <TouchableOpacity  style={{ alignSelf: "center", borderWidth: 1, borderColor: "rgba(0,0,0,0.2)"}}  onPress={() => props.navigation.navigate("ArticlesStack")} >
                  <ImageBackground style={styles.button} source={{ uri: "https://i.postimg.cc/mD7r09R8/button-Back.png"}} imageStyle={{ borderRadius: 5 }}>
                    <Text style={{color: "white", fontFamily: "Poppins_700Bold",alignSelf: "center",fontSize: 16,}}>
                         Let's Go!
                     </Text>
                   </ImageBackground>
               </TouchableOpacity>
            </View>
          </>
          
        )
        :
        (
          <>
             <View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}>
        <Text style={styles.wishlistTittle}>Wish</Text>
        <Text style={styles.wishlistTittleIn}>list</Text>
        </View>
        <View style={styles.wishListContainer} >
          <View style={styles.wishListContainerBox}>
            <TextInput
              style={styles.wishListContainerInput}
              onChange={inputFilterHandler}
              placeholder='Search for products...'
              />
          </View>
          <View>
            <View style={styles.wishListArticles} >
              <FlatList 
                data={searched}
                keyExtractor={(product) => product._id}
                renderItem={( product => (
                    <TouchableOpacity onPress={() => props.navigation.navigate('ArticleStack', { id: product.item._id })}>
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
          </>
        )}
       <Footer/>
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
    width: 280,
    backgroundColor: 'white',
    alignSelf:"center",
    paddingHorizontal:10,
    paddingVertical:4,
    borderRadius:5,
    marginVertical:18,

  },
  wishlistTittle:{
    color: "white",
    fontSize: 38, 
    fontFamily: 'Poppins_800ExtraBold',
    textAlign: 'center',
    marginTop:-30
},
  wishlistTittleIn:{
    marginTop: -30,
    fontFamily: "Poppins_800ExtraBold",
    marginLeft: 3,
    fontSize: 38,
    color: "#67f2cb",
  },
  title: {
    fontFamily:"Poppins_700Bold",
    fontSize: 25,
    color: "white",
    textAlign:'center'
 },
 button: {
    paddingVertical: 10,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
   
 },
 textButton: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
 },


})
