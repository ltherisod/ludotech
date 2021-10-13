import React from "react";
import { connect } from "react-redux";
import articlesActions from "../redux/actions/articlesActions";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";

const Cart = (props) => {
  let totalCost = props.shoppingCart.reduce((count, item) => {
    return (
      count +
      item.quantity *
        (item.article.hasDiscount
          ? item.article.discountPrice
          : item.article.price)
    );
  }, 0);

  let totalWithoutDiscounts = props.shoppingCart.reduce((count, item) => {
    return count + item.quantity * item.article.price;
  }, 0);

  const updateCartFunction = (action, articleId) => {
    props
      .updateCart(action, articleId)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  const submitSell = () => {
    console.log("sell!");
  };

  return (
    <ScrollView>
      <View>
        <ImageBackground
          style={styles.mainImg}
          source={{ uri: "https://i.postimg.cc/0Q7FDTVz/fondoconfeti.png" }}
        >
          <HeroPages />
          <View style={styles.CartMain}>
            <Text style={styles.cartTitle}>Cart</Text>
            <View>
              <View>
                {props.shoppingCart.map((article) => {
                  return (
                    <View style={styles.productCard} key={article.article._id}>
                      <View style={styles.firstLine}>
                        <Image
                          style={styles.productImg}
                          source={{ uri: article.article.photos[0] }}
                        />
                        <Text style={styles.productName}>
                          {article.article.name}
                        </Text>
                        <TouchableOpacity
                          style={styles.delete}
                          onPress={() => {
                            updateCartFunction("delete", article.article._id);
                          }}
                        >
                          <Text style={styles.deleteText}>x</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.secondLine}>
                        <View style={styles.secondLineView}>
                          <Text style={styles.innerTitle}>Quantity:</Text>
                          <TouchableOpacity
                            style={styles.quantity}
                            onPress={() => {
                              updateCartFunction(
                                "decrement",
                                article.article._id
                              );
                            }}
                          >
                            <Text style={styles.quantityText}>{"<"}</Text>
                          </TouchableOpacity>
                          <Text style={styles.quantityNumber}>
                            {article.quantity}
                          </Text>
                          <TouchableOpacity
                            style={styles.quantity}
                            onPress={() => {
                              updateCartFunction(
                                "increment",
                                article.article._id
                              );
                            }}
                          >
                            <Text style={styles.quantityText}>{">"}</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.secondLineView}>
                          <Text style={styles.innerTitle}>Price:</Text>
                          {article.article.hasDiscount === false ? (
                            <Text style={styles.price}>
                              ${article.article.price}
                            </Text>
                          ) : (
                            <>
                              <Text style={styles.discountPrice}>
                                ${article.article.discountPrice}
                              </Text>
                              <Text style={styles.price}>
                                ${article.article.price}
                              </Text>
                            </>
                          )}
                        </View>
                      </View>
                      <View style={styles.thirdLine}>
                        <Text style={styles.innerTitle}>Subtotal:</Text>
                        <Text style={styles.subtotal}>
                          $
                          {article.quantity *
                            (article.article.hasDiscount
                              ? article.article.discountPrice
                              : article.article.price)}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={styles.totalsCard}>
              <View>
                <View style={styles.totals}>
                  <Text style={styles.totalsText}>
                    Total without discounts:
                  </Text>
                  <Text style={styles.discountPrice}>
                    ${totalWithoutDiscounts}
                  </Text>
                </View>
                <View style={styles.totals}>
                  <Text style={styles.totalsText}>Total:</Text>
                  <Text style={styles.price}>${totalCost}</Text>
                </View>
              </View>
              <TouchableOpacity onClick={submitSell}>
                <Text>Buy with PayPal</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Footer />
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    shoppingCart: state.users.shoppingCart,
  };
};

const mapDispatchToProps = {
  updateCart: articlesActions.updateCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  CartMain: {
    minHeight: height - StatusBar.currentHeight,
    alignItems: "center",
  },
  mainImg: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  cartTitle: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 35,
    color:'purple'
  },
  productCard: {
    borderTopColor: "rgb(204, 204, 204)",
    borderTopWidth: 1,
    paddingBottom: 6,
    paddingTop: 12,
    marginTop: 10,
  },
  productImg: {
    width: 100,
    height: 100,
  },
  firstLine: {
    flexDirection: "row",
    width: 380,
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    fontFamily: "Poppins_600SemiBold",
    color: "gray",
    fontSize: 18,
    textAlign: "left",
    width: "60%",
  },
  delete: {
    backgroundColor: "rgb(160, 160, 160)",
    paddingTop: 3,
    paddingBottom: 6,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  deleteText: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
  },
  secondLine: {
    flexDirection: "row",
    width: 380,
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondLineView: {
    flexDirection: "row",
    alignItems: "center",
  },
  thirdLine: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  quantity: {
    color: "white",
    backgroundColor: "#6aefcf",
    paddingTop: 2,
    paddingBottom: 3,
    paddingHorizontal: 10,
    borderRadius: 100,
    margin: 5,
  },
  quantityText: {
    fontFamily: "Poppins_600SemiBold",
    color: "white",
    fontSize: 18,
  },
  quantityNumber: {
    fontFamily: "Poppins_600SemiBold",

    color: "gray",
    fontSize: 16,
  },
  innerTitle: {
    fontFamily: "Poppins_600SemiBold",
    color: "gray",
    paddingHorizontal: 10,
    fontSize: 16,
  },
  totalsCard: {
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    shadowColor: "gray",
    shadowOpacity: 10,
    shadowOffset: { width: 0, height: 5 },
    width: 380,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6.0,
    elevation: 24,
  },
  totals: {
    flexDirection: "row",
    padding: 5,
    alignSelf: "center",
  },
  totalsText: {
    fontFamily: "Poppins_600SemiBold",
    color: "gray",
    paddingRight: 5,
    fontSize: 16,
  },
  price: {
    color: "green",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  discountPrice: {
    color: "gray",
    textDecorationLine: "line-through",
    marginRight: 10,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  subtotal: {
    color: "gray",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});
