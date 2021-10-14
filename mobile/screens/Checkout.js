import React from "react"
import Footer from "../components/Footer"
import HeroPages from "../components/HeroPages"
import usersActions from "../redux/actions/usersActions"
import { useDispatch } from "react-redux"
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from "react-native"
import {Linking} from "react-native"

const Checkout = (props) => {

const purchase = {
    "error": null,
    "response":  {
      "purchase":  {
        "__v": 0,
        "_id": "61676f2f6b62805fa21e7264",
        "articles":  [
           {
            "_id": "61603f6c9ea1b33b3602c8ef",
            "brand": "Fantasy Flight Games",
            "discountPrice": 85,
            "gameType": "Miniatures Game",
            "genres":  [
              "Strategy",
            ],
            "hasDiscount": true,
            "maxPlayers": 2,
            "minAge": 14,
            "minPlayers": 2,
            "name": "Star Wars Legion",
            "photos":  [
              "https://i.postimg.cc/htc5gcX9/starwars-Legion-Photo1.png",
              "https://i.postimg.cc/L5FVT3fz/starwars-Legion-Photo2.png",
              "https://i.postimg.cc/jj5KxzDQ/starwars-Legion-Photo3.png",
            ],
            "price": 100,
            "quantity": 2,
            "size": "Medium",
            "stock": 6,
            "weight": 4,
          },
        ],
        "direction":  {
          "city": "Ciudad",
          "department": "Departamento",
          "number": 123,
          "receiver": "Yo",
          "state": "Estado",
          "street": "Calle",
          "zipCode": "4030",
        },
        "logs":  [],
        "paymentDetails":  {
          "method": "STRIPE",
          "orderId": "pm_1JkH6mLXO1yt6E5TeYpN2BaF",
          "receipt": "https://pay.stripe.com/receipts/acct_1Ji6QGLXO1yt6E5T/ch_3JkH6nLXO1yt6E5T0ROaOKbP/rcpt_KP5HgPuk6oWOVXsdiX8IqZrpaVpYgU0",
        },
        "status": "processing",
        "timestamp": "2021-10-13T11:26:11.215Z",
        "total": 200,
        "user": "6162ea1cb2ce030d274f330e",
      },
      "user":  {
        "__v": 1,
        "_id": "6162ea1cb2ce030d274f330e",
        "shoppingCart":  [],
        "wishList":  [],
      },
    },
    "success": true,
}

    const dispatch = useDispatch()
    // const { purchase } = props.location.state.response
    const { articles, direction, status, timestamp, paymentDetails } = purchase.response.purchase
    console.log(articles[0]._id)
    return (
        <ScrollView>
            <View style={{backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`, ...styles.body}}>
            <HeroPages />
            <Text style={styles.purchaseTitle}>
                Purchase <Text style={styles.purchaseSecondTitle}>Summary</Text>
            </Text>
            <View style={styles.checkoutPrincipalContainer}>
                    <View style={styles.checkoutContainer}>
                        <Text style={styles.textDate}>
                            Date: {timestamp.slice(0, 10).replace(/-/g, " / ")}
                        </Text>
                        <View style={styles.divlogoCheckout}>
                            <Text style={styles.logoCheckout}>
                                <Text style={styles.spanViolet}>ludo</Text>
                                <Text style={styles.spanRed}>t</Text>
                                <Text style={styles.spanGreen}>e</Text>
                                <Text style={styles.spanOrangi}>c</Text>
                                <Text style={styles.spanViolet2}>h</Text>
                            </Text>
                            <Image source={{uri: "https://i.postimg.cc/FFjzhxf6/rubik-solo.png"}} style={styles.imgLogoCheckout} alt="ludoLogo"/>
                        </View>
                        <View>
                            {articles.map((article) => {
                                return (
                                    <View key={article._id}>
                                        <View style={styles.articleContainer}>
                                            <View style={styles.leftCheckout}>
                                                <Text style={styles.leftCheckoutText}>{article.name}</Text>
                                                <Text style={styles.leftCheckoutText}>{article.brand}</Text>
                                            </View>
                                            <View style={styles.rightCheckout}>
                                                <Text style={styles.rightCheckoutText}>
                                                    x <Text style={styles.textQuantity}>{article.quantity}</Text>u
                                                </Text>
                                                {article.hasDiscount === false ? (
                                                    <Text style={styles.price}>${article.price.toFixed(2)} USD</Text>
                                                ) : (
                                                    <View style={styles.priceContainer}>
                                                        <Text>
                                                            ${article.price.toFixed(2)}
                                                        </Text>
                                                        <Text>
                                                            <Text style={{color: "green"}}>
                                                            ${article.discountPrice.toFixed(2)}
                                                            </Text>
                                                            USD
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                        <View style={styles.totalPriceContainer}>
                                            <Text>Total: </Text>
                                            {!article.hasDiscount ? (
                                            <Text>${purchase.total.toFixed(2)} USD</Text>
                                            ) : (
                                            <Text>
                                                $
                                                {(
                                                    article.quantity *
                                                    (article.hasDiscount
                                                        ? article.discountPrice
                                                        : article.price)
                                                ).toFixed(2)}
                                                USD
                                            </Text>
                                            )}
                                        </View>
                                    </View>
                                )
                            })}
                            <Text>Send to:</Text>
                            <View style={styles.personalData}>
                                <Text>
                                    Street: 
                                    <Text style={{ color: "gray", marginRight: "10px" }}>
                                        {direction.street}
                                    </Text>
                                    N° 
                                    <Text style={{ color: "gray", marginRight: "10px" }}>
                                        {direction.number}
                                    </Text>
                                    Department: 
                                    <Text style={{ color: "gray", marginRight: "10px" }}>
                                        {direction.department}
                                    </Text>
                                </Text>
                                <Text>
                                    City: 
                                    <Text style={{ color: "gray", marginRight: "10px" }}>
                                        {direction.city}
                                    </Text>
                                    State: 
                                    <Text style={{ color: "gray", marginRight: "10px" }}>
                                        {direction.state}
                                    </Text>
                                    Zip Code: 
                                    <Text style={{ color: "gray", marginRight: "10px" }}>
                                        {direction.zipCode}
                                    </Text>
                                </Text>
                                <Text>
                                    Receiver: 
                                    <Text style={{ color: "gray", marginRight: "10px" }}>
                                        {direction.receiver}
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.statusContainer}>
                            <Text>Status: </Text>
                            <Text style={{ color: "orange" }}>{status}</Text>
                            </View>
                            <Text>Selected payment method: 
                                <Text style={{ color: "darkgreen" }}>
                                    {paymentDetails.method === "PAYPAL"
                                        ? "PAYPAL"
                                        : "CREDIT CARD"}
                                </Text>
                            </Text>
                            <View style={styles.paymentDetailsContainer}>
                                <Image style={styles.paymentDetailsImage} source={{uri: "https://i.postimg.cc/xC3sq7tJ/pngkey-com-bar-code-png-131088.png"}} alt="codeBar"/>
                                {paymentDetails.method === "PAYPAL" && (
                                    <Text>{paymentDetails.orderId}</Text>
                                )}
                                {paymentDetails.method === "STRIPE" && (
                                    <>
                                        <Text>
                                            {paymentDetails.orderId
                                            .replace(/[a-zA-Z]/g, 0)
                                            .slice(4, 23)}
                                        </Text>
                                        <View className="bg}warning">
                                            <TouchableOpacity onPress={() => {Linking.openURL(paymentDetails.receipt)}}>
                                                <Text>See additional receipt</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}
                            </View>
                            {/* <View style={styles.pdfContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Linking.openURL(`https://lodotechgames.herokuapp.com/api/receipt/${purchase._id}`)
                                    }}
                                    style={{
                                        backgroundImage: `url("https://i.postimg.cc/GhMnJB8K/button-PDF.png")`,
                                    }}
                                >
                                    <Text>Download PDF</Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Home")}
                        style={{backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`, ...styles.addProduct}}
                    >
                        <Text>BACK TO HOME</Text>
                    </TouchableOpacity>
            </View>
            <Footer />
            </View>
        </ScrollView>
    )
}

export default Checkout

const styles = StyleSheet.create({
    body: {

    },
    purchaseTitle: {

    },
    purchaseSecondTitle: {

    },
    checkoutPrincipalContainer: {

    },
    checkoutContainer: {

    },
    textDate: {

    },
    addProduct: {

    },
    divlogoCheckout: {

    },
    logoCheckout: {

    },
    spanViolet: {

    },
    spanRed: {

    },
    spanGreen: {

    },
    spanOrangi: {

    },
    spanViolet2: {

    },
    imgLogoCheckout: {

    },
    articleContainer: {

    },
    leftCheckout: {

    },
    leftCheckoutText: {

    },
    rightCheckout: {

    },
    rightCheckoutText: {

    },
    textQuantity: {

    },
    price: {

    },
    priceContainer: {

    },
    totalPriceContainer: {

    },
    personalData: {

    },
    statusContainer: {

    },
    paymentDetailsContainer: {

    },
    paymentDetailsImage: {

    },
    pdfContainer: {

    },

})