import React from "react"
import Footer from "../components/Footer"
import HeroPages from "../components/HeroPages"
import usersActions from "../redux/actions/usersActions"
import { useDispatch } from "react-redux"
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground} from "react-native"
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
    // console.log(articles[0]._id)
    return (
        <ScrollView>
            <ImageBackground style={{width:"100%", flex: 1}} source={{ uri:"https://i.postimg.cc/4NwFMLWs/fondo-Violeta.png" }}>
                <HeroPages />
                <View style={{flexDirection:"row", justifyContent:'center'}}>
                <Text style={styles.purchaseTitle}>Purchase </Text>
                <Text style={styles.purchaseSecondTitle}>Summary</Text>
                </View>
                <View style={styles.checkoutPrincipalContainer}>
                    <View style={styles.checkoutContainer}>
                        <Text style={styles.textDate}>
                            Date: {timestamp.slice(0, 10).replace(/-/g, " / ")}
                        </Text>
                        <View style={styles.divlogoCheckout}>
                            <Image source={require('../assets/logoSumary.png')} style={{width:160, height:55}} alt="ludoLogo" resizeMode='contain'/>
                        </View>
                        <View style={{backgroundColor:'#c8c9ca', width:285, height:3, marginVertical:8}}></View>
                        <View>
                            {articles.map((article) => {
                                return (
                                    <View key={article._id}>
                                        <View style={{flexDirection:'row'}}>
                                            <View style={styles.leftCheckout}>
                                                <Text style={styles.leftCheckoutText1}>{article.name}</Text>
                                                <Text style={styles.leftCheckoutText}>{article.brand}</Text>
                                            </View>
                                            <View style={styles.rightCheckout}>
                                                <Text style={styles.rightCheckoutText}>
                                                    x <Text style={styles.textQuantity}>{article.quantity}</Text>u
                                                </Text>
                                                {article.hasDiscount === false ? (
                                                    <Text style={{fontFamily:'Poppins_400Regular'}}>${article.price.toFixed(2)} USD</Text>
                                                ) : (
                                                    <View style={{flexDirection:'row', marginLeft:5 }}>
                                                        <Text style={{fontFamily:'Poppins_500Medium',fontSize:12,marginTop:3, textDecorationLine:'line-through', color:'gray'}}>
                                                            ${article.price.toFixed(2)}
                                                        </Text>
                                                        <Text style={{fontFamily:'Poppins_500Medium',fontSize:13, marginTop:2, marginLeft:2.5}}>
                                                            <Text style={{fontFamily:'Poppins_500Medium',fontSize:13, color:'green'}}>
                                                            ${article.discountPrice.toFixed(2)}
                                                            </Text>
                                                            USD
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                        <View style={{backgroundColor:'#c8c9ca', width:285, height:2, marginVertical:8}}></View>
                                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                            <Text style={{fontFamily:'Poppins_500Medium',fontSize:15}}>Total: </Text>
                                            {!article.hasDiscount ? (
                                            <Text style={{fontFamily:'Poppins_500Medium',fontSize:15}}>${purchase.total.toFixed(2)} USD</Text>
                                            ) : (
                                            <Text style={{fontFamily:'Poppins_500Medium',fontSize:15}}>
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
                            <View style={{backgroundColor:'#c8c9ca', width:285, height:3, marginVertical:8}}></View>
                            <Text style={{fontFamily:'Poppins_500Medium',fontSize:15}} >Send to:</Text>
                            <View style={styles.personalData}>
                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                    <Text style={{fontFamily:'Poppins_400Regular'}}>
                                    Street: 
                                    <Text style={{ color: "gray", marginRight: "10px" }}>
                                    {``} {direction.street}
                                    </Text>
                                    </Text>
                                    <Text style={{fontFamily:'Poppins_400Regular'}}>
                                    N° 
                                    <Text style={{ color: "gray", marginRight: "10px" }}>
                                    {``}  {direction.number}
                                    </Text>
                                    </Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                <Text style={{ fontFamily:'Poppins_400Regular'}}>Department: </Text>
                                    <Text style={{ color: "gray", fontFamily:'Poppins_400Regular'}}>
                                      {direction.department}
                                    </Text>
                                  </View> 
                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                    <Text style={{fontFamily:'Poppins_400Regular'}}>
                                    City: 
                                    <Text style={{ color: "gray", marginRight: "10px" }}>
                                    {``} {direction.city}
                                    </Text>
                                    </Text>
                                    <Text style={{fontFamily:'Poppins_400Regular'}}>
                                    State: 
                                    <Text style={{ color: "gray", marginRight: "10px" }}>
                                    {``}  {direction.state}
                                    </Text>
                                    </Text>
                                   
                                </View>
                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                    <Text style={{fontFamily:'Poppins_400Regular'}}>
                                     Zip Code: 
                                    <Text style={{ color: "gray", marginRight: "10px" }}>
                                    {``}  {direction.zipCode}
                                    </Text>
                                    </Text>
                                    <Text style={{fontFamily:'Poppins_400Regular'}}>Receiver: 
                                    <Text style={{ color: "gray", marginRight: "10px" }}>
                                    {``}  {direction.receiver}
                                    </Text>
                                    </Text>
                                </View>
                                <View style={{backgroundColor:'#c8c9ca', width:285, height:3, marginVertical:8}}></View>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <Text style={{fontFamily:'Poppins_500Medium'}}>Status: </Text>
                            <Text style={{ color: "orange", fontFamily:'Poppins_500Medium' }}>{status}</Text>
                            </View>
                            <View style={{backgroundColor:'#c8c9ca', width:285, height:3, marginVertical:8}}></View>
                            <Text style={{fontFamily:'Poppins_400Regular', fontSize:11, alignSelf:'center'}}>Selected payment method: 
                                <Text style={{ color: "darkgreen" }}>
                                    {paymentDetails.method === "PAYPAL"
                                        ? "PAYPAL"
                                        : "CREDIT CARD"}
                                </Text>
                            </Text>
                            <View style={styles.paymentDetailsContainer}>
                                <Image style={{width:200, height:100, alignSelf:'center', }} source={{uri: "https://i.postimg.cc/xC3sq7tJ/pngkey-com-bar-code-png-131088.png"}} alt="codeBar" resizeMode='contain'/>
                                {paymentDetails.method === "PAYPAL" && (
                                    <Text style={{ textAlign:'center'}}>{paymentDetails.orderId}</Text>
                                )}
                                {paymentDetails.method === "STRIPE" && (
                                    <>
                                        <Text style={{ textAlign:'center', fontSize:11}} >
                                            000001111{paymentDetails.orderId
                                            .replace(/[a-zA-Z]/g, 0)
                                            .slice(4, 23)}
                                        </Text>
                                        <View>
                                            <TouchableOpacity onPress={() => {Linking.openURL(paymentDetails.receipt)}}>
                                                <Text style={{fontFamily:'Poppins_500Medium', fontSize:13, alignSelf:'center', textDecorationLine:'underline', color:'blue'}}>See additional receipt</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}
                            </View>
                             <View style={styles.pdfContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Linking.openURL(`https://lodotechgames.herokuapp.com/api/receipt/${purchase._id}`)}} style={{marginTop:5, alignSelf:'center'}}>
                                            <ImageBackground style={{ width:120, padding:3}} source={{uri: "https://i.postimg.cc/GhMnJB8K/button-PDF.png",}} imageStyle={{ borderRadius: 5 }}>
                                    <Text style={{ color: "white",fontFamily: "Poppins_600SemiBold", alignSelf: "center",fontSize: 13, }}>Download PDF</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View> 
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Home")} style={{marginTop:20, alignSelf:'center'}}
                    >
                        <ImageBackground
                        style={{ width:150, padding:5}}
                        source={{uri: "https://i.postimg.cc/mD7r09R8/button-Back.png",}}imageStyle={{ borderRadius: 5 }}>
                        <Text  style={{ color: "white",fontFamily: "Poppins_600SemiBold", alignSelf: "center",fontSize: 13, }}>BACK TO HOME</Text>
                        </ImageBackground>
                    </TouchableOpacity>
            </View>
            <Footer />
            </ImageBackground>
        </ScrollView>
    )
}

export default Checkout

const styles = StyleSheet.create({
    body: {

    },
    purchaseTitle: {
        color:"white",
        fontFamily:"Poppins_700Bold",
        fontSize:27,
        textAlign:"center",
    },
    purchaseSecondTitle: {
        color: "#67f2cb",
        fontFamily:"Poppins_700Bold",
        fontSize:27,
        textAlign:"center",
    },
    checkoutPrincipalContainer: {
        alignItems:'center'
    },
    checkoutContainer: {
        backgroundColor:'white',
        width:'90%',
        alignSelf:'center',
        borderRadius:10,
        padding:20
    },
    textDate: {
        fontFamily:"Poppins_400Regular",
        fontSize:12,
        alignSelf:'flex-end'
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
    leftCheckoutText1: {
        fontFamily:"Poppins_500Medium",
        fontSize:15
    },
    leftCheckoutText: {
        fontFamily:"Poppins_400Regular",
        fontSize:12
    },
    
    rightCheckout: {
        flexDirection:'row',
    },
    rightCheckoutText: {
        fontFamily:"Poppins_400Regular",
        fontSize:15
    },
    textQuantity: {
        fontFamily:"Poppins_500Medium",
        color:'orange'
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