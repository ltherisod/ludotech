import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
import articlesActions from "../redux/actions/articlesActions";
import usersActions from "../redux/actions/usersActions";
import Icon from "react-native-vector-icons/FontAwesome";

const Article = (props) => {
  const addToCart = (e, id) => {
    e.stopPropagation();
    props.updateCart("add", id);
  };

  const addToWishlist = (e, id) => {
    e.stopPropagation();
    props.toggleWishList(id);
  };

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
  } = props.article;

  return (
    <ImageBackground
      style={styles.articleCard}
      source={{ uri: "https://i.postimg.cc/bN5SxYyB/articles-Card500.png" }}
    >
      <ImageBackground
        source={{ uri: iconPhotos }}
        resizeMode="cover"
        style={styles.articleIcon}
      >
        <Pressable onPress={(e) => addToWishlist(e, _id)}>
          {props.wishList.some((i) => {
            return i._id === _id;
          }) ? (
            <Icon 
              name="heart"
              style={{
                fontSize: 30,
                color: "red",
                alignSelf: "flex-end",
                margin: 10,
              }}
            />
          ) : (
            <Icon
              name="heart"
              style={{
                fontSize: 30,
                color: "pink",
                alignSelf: "flex-end",
                margin: 10,
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
            <Text style={styles.articlehasDiscountPrice}>${price}</Text>
            <Text style={styles.articlePrice}>${discountPrice} USD</Text>
          </>
        )}
      </View>
      <Text style={styles.articleName}>{name}</Text>

      <View>
        <View style={styles.gameDataBox}>
          <View style={styles.gameDataLine}>
            <Image style={styles.icons} source={require("../assets/gener.png")} />
            {genres.map((genre) => <Text key={genre._id} style={styles.dataText}>{genre.name}</Text>)}
          </View>
          <View style={styles.gameDataLine}>
            <Image style={styles.icons} source={require("../assets/type.png")} />
            <Text style={styles.dataText}>{gameType.name}</Text>
          </View>
          <View style={styles.gameDataLastLine}>
            <View style={styles.gameDataLine}>
              <Image style={styles.icons} source={require("../assets/age.png")} /> 
              <Text style={styles.dataText}>{minAge}</Text>
            </View>
            <Pressable onPress={(e) => addToCart(e, _id)}>
              <Image style={styles.cart} source={require("../assets/buy.png")}/>
            </Pressable>            
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = (state) => {
  return {
    wishList: state.users.wishList,
  };
};

const mapDispatchToProps = {
  updateCart: articlesActions.updateCart,
  toggleWishList: usersActions.toggleWishList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);

const styles = StyleSheet.create({
  articleCard: {
    width: 330,
    height: 500,
    margin: 5,
    marginTop: 15,
    alignSelf: "center",
    
  },
  heart: {
backgroundColor: 'red'
  },
  articleIcon: {
    width: 260,
    height: 260,
    alignSelf: "center",
    borderRadius: 18,
    backgroundColor: "white",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6.00,
    elevation: 24,
  },
  articleName: {
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontSize: 20,
    color: "gray",
    marginTop: 5,
  },
  priceBox: {
    marginTop: 10,
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
    textDecorationLine: 'line-through',
    color: "#D3D3D3",
    fontSize: 20,
    marginHorizontal: 5,
  },
  icons: {
    marginRight: 15,
    width: 40,
    height: 40,
  },
  photoArticle: {
    alignSelf: "flex-start",
  },
  gameDataBox: {
      width: '75%',
      alignSelf: 'center',
      alignItems: 'flex-start',
  },
  gameDataLine: {
      marginVertical: 4,
      flexDirection: 'row',
      alignItems: 'center'
  },
  gameDataLastLine: {
      flexDirection: 'row',
      marginVertical: 4,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center'
  }, 
  dataText: {
    color: 'gray',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
},
cart: {
    marginRight: 10,
   width: 45,
    height: 45,
  },
});
