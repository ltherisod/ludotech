import React from "react"
import { connect } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"
import {View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Dimensions, ImageBackground} from "react-native"
import Header from "../components/Header"
import Footer from "../components/Footer"
import HeroPages from "../components/HeroPages"

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
                {/* <Header/> */}
                <View>
                    <ImageBackground style={styles.mainImg} source={{ uri: "https://i.postimg.cc/0Nz37Ydx/fondo-Blanco.png" }}>
                <HeroPages />
                <View style={styles.CartMain}>
                    <Text style={styles.cartTitle}>Cart</Text>
                    <View>
                        {/* <View>
                            
                            <Text>Quantity</Text>
                            <Text>Price</Text>
                            <Text>Subtotal</Text>
                        </View> */}
                        <View>
                        {props.shoppingCart.map((article) => {
                            return (
                                <View key={article.article._id}>
                                    <View style={styles.firstLine}>
                                    <Image style={styles.productImg} source={{uri: article.article.photos[0]}}/>
                                    <Text style={styles.productName}>{article.article.name}</Text>
                                    <TouchableOpacity style={styles.delete} onPress={() => {updateCartFunction("delete", article.article._id)}}>
                                        <Text style={styles.deleteText}>x</Text>
                                    </TouchableOpacity>
                                    </View>

                                    <View style={styles.secondLine}>
                                    <View style={styles.secondLineView}>
                                    <Text style={styles.innerTitle}>Quantity:</Text>    
                                        <TouchableOpacity style={styles.quantity} onPress={() => {updateCartFunction("decrement", article.article._id)}}>
                                            <Text style={styles.quantityText}>{'<'}</Text>
                                        </TouchableOpacity>
                                        <Text>{article.quantity}</Text>
                                        <TouchableOpacity style={styles.quantity} onPress={() => {updateCartFunction("increment", article.article._id)}}>
                                            <Text style={styles.quantityText}>{'>'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.secondLineView}>
                                    <Text style={styles.innerTitle}>Price:</Text>    
                                    {article.article.hasDiscount === false ? (
                                        <Text>${article.article.price}</Text>
                                    ) : (
                                        <>
                                            <Text>${article.article.price}</Text>
                                            <Text>${article.article.discountPrice}</Text>
                                        </>
                                    )}
                                    </View>

                                    </View>
                                    <View style={styles.thirdLine}>
                                    <Text style={styles.innerTitle}>Subtotal:</Text>
                                    <Text>${article.quantity*(article.article.hasDiscount ? article.article.discountPrice : article.article.price)}</Text>
                                    </View>
                                </View>
                            )
                        })}
                        </View>
                    </View>
                    <View style={styles.totalsCard}>
                        <View>
                            <View style={styles.totals}>
                                <Text style={styles.totalsText}>Total without discounts:</Text>
                                <Text>${totalWithoutDiscounts}</Text>
                            </View>
                            <View style={styles.totals}>
                                <Text style={styles.totalsText}>Total with discounts:</Text>
                                <Text>${totalCost}</Text>
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
        alignItems: 'center'
    },
    mainImg: {
        justifyContent: "center",
        width: "100%",
        height: "100%",
        alignItems: "center",
      },
      cartTitle: {
        fontFamily: "Poppins_700Bold",
        fontSize: 25,
      },
      productImg: {
          width: 100,
          height: 100
      },
      productTitle: {
        paddingRight: 10,
        fontSize: 18,
        paddingTop: 15
      },
      firstLine: {
          flexDirection: 'row',
          width: 380,
          justifyContent: 'space-between',
          alignItems: 'center',
      },
      productName: {
        fontSize: 18,
        textAlign: 'left',
        width: '60%'
      },
      delete: {
          backgroundColor: 'rgb(160, 160, 160)',
          paddingTop: 5,
          paddingBottom: 7,
          paddingHorizontal: 10,
          borderRadius: 100
      },
      deleteText: {
          color: 'white'
      },
      secondLine: {
        flexDirection: 'row',
        width: 380,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    secondLineView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    thirdLine: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    quantity: {
        color: 'white',
        backgroundColor: '#6aefcf',
        paddingTop: 5,
        paddingBottom: 7,
        paddingHorizontal: 10,
        borderRadius: 100,
        margin: 5
    },
    quantityText: {
        color: 'white'
    },
    innerTitle: {
        paddingRight: 10,
        fontSize: 18
    },
    totalsCard: {
        marginTop: 30,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        shadowColor: 'gray',
        shadowOpacity: 10,
        width: 380,
    },
    totals: {
        flexDirection: 'row',
        padding: 5
    },
    totalsText: {
        paddingRight: 5
    }
})