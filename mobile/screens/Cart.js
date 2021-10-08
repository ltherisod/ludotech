import React from "react"
import { connect } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"
import {View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Dimensions} from "react-native"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Cart = (props) => {
    let totalCost = props.shoppingCart.reduce((count, item) => {
        return (
          count +
          item.quantity *
            (item.article.hasDiscount
              ? item.article.discountPrice
              : item.article.price)
        )
    }, 0)
    
    let totalWithoutDiscounts = props.shoppingCart.reduce((count, item) => {
        return count + item.quantity * item.article.price
    }, 0)
    
    const updateCartFunction = (action, articleId) => {
        props.updateCart(action, articleId)
        .then((res) => {
            console.log(res)
        })
        .catch((e) => console.log(e))
    }
    
    const submitSell = () => {
        console.log("sell!")
    }
    
    return (
        <SafeAreaView style={{marginTop: Platform.OS === "android" && StatusBar.currentHeight, flex: 1}}>
            <ScrollView>
                <Header/>
                <View style={styles.CartMain}>
                    <Text>Cart</Text>
                    <View>
                        <View>
                            <Text>Product</Text>
                            <Text>Delete</Text>
                            <Text>Quantity</Text>
                            <Text>Price</Text>
                            <Text>Subtotal</Text>
                        </View>
                        <View>
                        {props.shoppingCart.map((article) => {
                            return (
                                <View key={article.article._id}>
                                    <Image source={{uri: article.article.photos[0]}}/>
                                    <Text>{article.article.name}</Text>
                                    <TouchableOpacity onPress={() => {updateCartFunction("delete", article.article._id)}}>
                                        <Text>x</Text>
                                    </TouchableOpacity>
                                    <View>
                                        <TouchableOpacity onPress={() => {updateCartFunction("increment", article.article._id)}}>
                                            <Text>+</Text>
                                        </TouchableOpacity>
                                        <Text>{article.quantity}</Text>
                                        <TouchableOpacity onPress={() => {updateCartFunction("decrement", article.article._id)}}>
                                            <Text>-</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                    {article.article.hasDiscount === false ? (
                                        <Text>${article.article.price}</Text>
                                    ) : (
                                        <>
                                            <Text>${article.article.price}</Text>
                                            <Text>${article.article.discountPrice}</Text>
                                        </>
                                    )}
                                    </View>
                                    <Text>${article.quantity*(article.article.hasDiscount ? article.article.discountPrice : article.article.price)}</Text>
                                </View>
                            )
                        })}
                        </View>
                    </View>
                    <View>
                        <View>
                            <View>
                                <Text>Total without discounts:</Text>
                                <Text>${totalWithoutDiscounts}</Text>
                            </View>
                            <View>
                                <Text>Total with discounts:</Text>
                                <Text>${totalCost}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onClick={submitSell}>
                            <Text>Buy with PayPal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Footer/>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
      shoppingCart: state.users.shoppingCart,
    }
}
  
const mapDispatchToProps = {
    updateCart: articlesActions.updateCart,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
  
const {height} = Dimensions.get("window")
const styles = StyleSheet.create({
    CartMain: {
        minHeight: height-StatusBar.currentHeight,
    },
})