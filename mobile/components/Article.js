import React from "react"
import {
   View,
   Text,
   ImageBackground,
   Image,
   TouchableOpacity,
   StyleSheet,
   Pressable,
} from "react-native"
import { connect } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"
import usersActions from "../redux/actions/usersActions"
import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"

const Article = (props) => {
   const addToCart = (e, id) => {
      if (props.user) {
         e.stopPropagation()
         props.updateCart("add", id)
         Toast.show({
            type: "success",
            text1: `${name} added🤩`,
            text2: "Press here to see your cart",
            onPress: () => props.navigation.navigate("cart"),
            position: "bottom",
         })
      } else {
         Toast.show({
            type: "error",
            text1: `You need to be logged 😢`,
            text2: "Go to sign in now to add a product in your cart",
            position: "bottom",
         })
      }
   }

   const addToWishlist = (e, id) => {
      let status = props.wishList.some((i) => {
         return i._id === _id
      })

      if (props.user && status) {
         e.stopPropagation()
         props.toggleWishList(id)
         Toast.show({
            type: "success",
            text1: `${name} removed😞`,
            text2: "Press here to see your wishlist",
            onPress: () => props.navigation.navigate("wishlist"),
            position: "bottom",
         })
      } else if (props.user && !status) {
         e.stopPropagation()
         props.toggleWishList(id)
         Toast.show({
            type: "success",
            text1: `${name} added🤩`,
            text2: "Press here to see your wishlist",
            onPress: () => props.navigation.navigate("wishlist"),
            position: "bottom",
         })
      }

      if (!props.user) {
         Toast.show({
            type: "error",
            text1: `You need to be logged 😢`,
            text2: "Go to sign in now to add a product in your wishist",
            position: "bottom",
         })
      }
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
      iconPhotos,
   } = props.article

   return (
      <View style={styles.borderCard}>
         <ImageBackground
            style={styles.articleCard}
            source={{ uri: "https://i.postimg.cc/59Rp3FW9/articlelast.png" }}
         >
            <ImageBackground
               source={{ uri: iconPhotos }}
               resizeMode="cover"
               style={styles.articleIcon}
            >
               <Pressable onPress={(e) => addToWishlist(e, _id)}>
                  {props.wishList.some((i) => {
                     return i._id === _id
                  }) ? (
                     <Icon
                        name="heart"
                        style={{
                           fontSize: 32,
                           color: "#e561ae",
                           alignSelf: "flex-end",
                           margin: 5,
                        }}
                     />
                  ) : (
                     <Icon
                        name="heart"
                        style={{
                           fontSize: 32,
                           color: "pink",
                           alignSelf: "flex-end",
                           margin: 5,
                        }}
                     />
                  )}
               </Pressable>
            </ImageBackground>
            <View style={styles.priceBox}>
               {hasDiscount === false ? (
                  <Text style={styles.articlePrice}>${price} USD</Text>
               ) : (
                  <>
                     <Text style={styles.articlehasDiscountPrice}>
                        ${price}
                     </Text>
                     <Text style={styles.articlePrice}>
                        ${discountPrice} USD
                     </Text>
                  </>
               )}
            </View>
            <View style={styles.nameLines}>
               <Text style={styles.articleName}>{name}</Text>
            </View>
            <View>
               <View style={styles.gameDataBox}>
                  <View style={styles.gameDataLine}>
                     <Image
                        style={styles.icons}
                        source={require("../assets/gener.png")}
                     />
                     {genres.map((genre) => (
                        <Text key={genre._id} style={styles.dataText}>
                           {genre.name}
                        </Text>
                     ))}
                  </View>

                  <View style={styles.gameDataLastLine}>
                     <View style={styles.gameDataLine}>
                        <Image
                           style={styles.icons}
                           source={require("../assets/type.png")}
                        />
                        <Text style={styles.dataText}>{gameType.name}</Text>
                     </View>
                     <Pressable onPress={(e) => addToCart(e, _id)}>
                        <Image
                           style={styles.cart}
                           source={require("../assets/buy.png")}
                        />
                     </Pressable>
                  </View>
               </View>
            </View>
         </ImageBackground>
      </View>
   )
}

const mapStateToProps = (state) => {
   return {
      wishList: state.users.wishList,
      user: state.users.user,
   }
}

const mapDispatchToProps = {
   updateCart: articlesActions.updateCart,
   toggleWishList: usersActions.toggleWishList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)

const styles = StyleSheet.create({
   borderCard: {
      backgroundColor: "rgb(212, 212, 212)",
      width: 348,
      height: 492,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 25,
      margin: 5,
      marginTop: 15,
   },
   articleCard: {
      width: 320,
      height: 465,
      borderRadius: 25,
      alignSelf: "center",
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 6,
      },
      shadowOpacity: 0.3,
      shadowRadius: 6.0,
      elevation: 24,
   },
   heart: {
      backgroundColor: "red",
   },
   articleIcon: {
      width: 280,
      height: 250,
      alignSelf: "center",
      marginTop: 15,
   },
   articleName: {
      fontFamily: "Poppins_700Bold",
      textAlign: "center",
      fontSize: 20,
      color: "gray",
      marginTop: 5,
   },
   nameLines: {
      borderBottomColor: "#d8d8d8",
      borderBottomWidth: 2,
      borderTopColor: "#d8d8d8",
      borderTopWidth: 2,
      paddingVertical: 5,
      paddingBottom: 10,
   },
   priceBox: {
      flexDirection: "row",
      alignSelf: "center",
   },
   articlePrice: {
      fontFamily: "Poppins_700Bold",
      alignSelf: "center",
      color: "#90EE90",
      fontSize: 20,
      marginHorizontal: 5,
   },
   articlehasDiscountPrice: {
      fontFamily: "Poppins_700Bold",
      alignSelf: "center",
      textDecorationLine: "line-through",
      color: "#D3D3D3",
      fontSize: 20,
      marginHorizontal: 5,
   },
   icons: {
      marginRight: 15,
      width: 35,
      height: 35,
      borderRadius: 20,
   },
   photoArticle: {
      alignSelf: "flex-start",
   },
   gameDataBox: {
      width: "80%",
      alignSelf: "center",
      alignItems: "flex-start",
      paddingTop: 5,
   },
   gameDataLine: {
      marginVertical: 4,
      flexDirection: "row",
      alignItems: "center",
   },
   gameDataLastLine: {
      flexDirection: "row",
      marginVertical: 4,
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
   },
   dataText: {
      color: "gray",
      fontSize: 16,
      fontFamily: "Poppins_600SemiBold",
   },
   cart: {
      marginRight: 10,
      width: 45,
      height: 45,
   },
})
