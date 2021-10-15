import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import HeroPages from '../components/HeroPages'
import { connect } from 'react-redux'
import usersActions from "../redux/actions/usersActions"
import Footer from "../components/Footer"

const PurchasesScreen = (props) => {

  const [purchases, setPurchases] = useState([])
  const [searched, setSearched] = useState([])

  useEffect(() => {
    async function getPurchases() {
      try {
        let response = await props.getPurchases(props.user)
        setPurchases(response.response)
        setSearched(response.response)
      } catch (e) {
        console.log(e)
      }
    }
    getPurchases()
    // eslint-disable-next-line
   }, [])

   const dateFunction = (date) => {
    let dateFormat = date.slice(0, 9)
    return dateFormat
   }
 
 
  return (
    <ScrollView>
      <ImageBackground
        style={{ width: "100%", minHeight: 600 }}
        source={{ uri: "https://i.postimg.cc/0Q7FDTVz/fondoconfeti.png" }}
      >
        <HeroPages />
        <Text style={styles.purchasesTitle}> <Text style={{color:"#67f2cb"}}>My</Text> purchases</Text>
        <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 15, }} >
          {purchases.map((purchase, index) => (
            <View key={index} style={styles.purchaseCard} >
              <View style={styles.purchaseOrderId} >
                <Text style={styles.purchaseOrderIdText} >Order ID: </Text>
                <Text style={styles.purchaseOrderIdTextTwo} >{purchase._id} </Text>
              </View>

              <View style={styles.purchaseDateAmountLine} >
                <View style={styles.purchaseDate} >
                  <Text style={styles.purchaseDateText} >Date: </Text>
                  <Text style={styles.purchaseDateTextTwo} >{dateFunction(purchase.timestamp)} </Text>
                </View>
                <View style={styles.purchaseAmount} >
                  <Text style={styles.purchaseAmountText} >Amount: </Text>
                  <Text style={styles.purchaseAmountTextTwo} >$ {purchase.total} </Text>
                </View>
              </View>

              {purchase.articles.map((article, index) => (
                <View key={index} style={styles.purchaseArticle} >
                  <ImageBackground style={styles.purchaseArticlePhoto} source={{ uri: article.photos[0] }} ></ImageBackground>
                  <View style={styles.purchaseArticleBox} >
                    <Text style={styles.purchaseArticleBoxText} >{article.name} </Text>
                    <View style={styles.purchaseArticleBoxTwo} >
                      <Text style={styles.purchaseArticleBoxTwoText} >Price: $ {article.price} </Text>
                      <Text style={styles.purchaseArticleBoxTwoTextTwo} >Quantity: {article.quantity} </Text>
                    </View>
                  </View>
                </View>
              ))}
              <View style={styles.purchaseAddress} >
                <Text style={styles.purchaseAddressText} >Address:</Text>
                <View style={styles.purchaseAddressTextTwo}>
                  <Text style={styles.purchaseAddressTextTwoText} >{purchase.direction.street + ' ' + purchase.direction.number + ', ' + purchase.direction.department},</Text>
                  <Text style={styles.purchaseAddressTextTwoText} >{purchase.direction.city + ', ' + purchase.direction.state + ', ' + purchase.direction.zipCode} </Text>
                </View>
              </View>

              <View style={styles.purchaseStatus} >
                <Text style={styles.purchaseStatusText} >Status:</Text>
                <Text style={styles.purchaseStatusTextTwo} >{purchase.status}</Text>
              </View>
            </View>
          ))}
        </View>
        <Footer/>
      </ImageBackground>
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user
  }
}

const mapDispatchToProps = {
  getPurchases: usersActions.getPurchaseByUser
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchasesScreen)

const styles = StyleSheet.create({
  container: {
    
  },
  purchasesTitle: {
    color: "purple",
    fontSize: 38,
    fontFamily: "Poppins_800ExtraBold",
    textAlign: "center",
    marginTop: -60,
    letterSpacing: 1,
  },

  purchaseCard: {
    marginVertical:10,
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignSelf:"center",
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 6.00,
    elevation: 24,
  },

  purchaseOrderId: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  purchaseOrderIdText: {
    marginRight: 5,
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: 'gray'
  },
  purchaseOrderIdTextTwo: {
    marginRight: 25,
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    color:'gray',
    letterSpacing:.5
  },

  purchaseDateAmountLine: {
    flexDirection: 'row',
    marginTop: 5,
    
  },  
  purchaseDate: {
    width: '50%',
    flexDirection: 'row',
    alignItems:'center',
  },
  purchaseDateText: {
    marginRight: 10,
    fontFamily: "Poppins_600SemiBold",
    color: 'gray'
  },
  purchaseDateTextTwo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize:13,
    color:'gray'
  },
  purchaseAmount: {
    width: '50%',
    flexDirection: 'row',
    alignItems:'center'
  },
  purchaseAmountText: {
    marginRight: 10,
    fontFamily: "Poppins_600SemiBold",
    color: 'gray'
  },
  purchaseAmountTextTwo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize:13,
    color:'gray'
  },

  purchaseArticle: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    padding: 5,
    borderRadius: 5,
  },
  purchaseArticlePhoto: {
    width: 90,
    height: 90,
    marginHorizontal: 10,
  },
  purchaseArticleBox: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purchaseArticleBoxText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    textAlign: 'center',
    color:'purple',
  },
  purchaseArticleBoxTwo: {
    flexDirection: 'row',
    alignItems:'center',
  },
  purchaseArticleBoxTwoText:{
    marginRight: 25,
    fontFamily:"Poppins_600SemiBold",
    color:'gray',
  },
  purchaseArticleBoxTwoTextTwo:{
    fontFamily:"Poppins_600SemiBold",
    color:'gray',
  },
  purchaseAddress:{
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
  },
  purchaseAddressText: {
    marginRight: 10,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: 'gray',
  },
  purchaseAddressTextTwoText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color:'gray'
  },

  purchaseStatus: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems:'center'
  },
  purchaseStatusText: {
    marginRight: 28,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: 'gray',
  },
  purchaseStatusTextTwo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color:'orange'
  }




})


