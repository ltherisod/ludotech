import React, { useState } from "react"
import { StyleSheet, Text, View, ScrollView, ImageBackground } from "react-native"
import { CardField, createPaymentMethod } from "@stripe/stripe-react-native"
import DirectionsForm from "../components/DirectionsForm"
import axios from "axios"
import { usePurchase } from "../hooks/usersHooks"
import { useDispatch, useSelector } from "react-redux"
import { ActivityIndicator, Button, Colors } from "react-native-paper"
import usersActions from "../redux/actions/usersActions"
import Preloader from "../components/Preloader"
import HeroPages from "../components/HeroPages"
import Footer from "../components/Footer"
import PreloaderBack from "../components/PreloaderBack"

const HOST = "https://lodotechgames.herokuapp.com"

const Stripe = (props) => {
   const [cardDetails, setCardDetails] = useState()
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const [purchase, loadingPurchase, errorPurchase] = usePurchase()
   const dispatch = useDispatch()
   const initialValues = {
      street: "Calle",
      number: "123",
      city: "Ciudad",
      zipCode: "4030",
      receiver: "Yo",
      department: "Departamento",
      state: "Estado",
   }
   const user = useSelector((state) => state.users.user)

   const purchaseHandler = async (values) => {
      setLoading(true)
      setError(null)
      try {
         if (!cardDetails?.complete)
            throw new Error("You must complete all card details.")
         const { paymentError, paymentMethod } = await createPaymentMethod({
            type: "card",
            card: cardDetails,
            billingDetails: {
               addressCity: values.city,
               addressCountry: "AR",
               addressLine1: `${values.street.trim()} ${values.number}`,
               addressLine2: values.city,
               addressPostalCode: values.zipCode,
               addressState: values.state,
               email: user.email,
               name: `${user.firstname} ${user.lastname}`,
               phone: user.phone,
            },
         })
         if (paymentError || !paymentMethod)
            throw new Error(paymentError || "Error proccessing your purchase.")

         const authorization = await axios.post(
            `${HOST}/api/stripe/payment-intent`,
            { id: paymentMethod.id },
            {
               headers: {
                  Authorization: `Bearer ${user.token}`,
               },
            }
            )

         if (!authorization.data.success)
            throw new Error("Error processing the transaction.")
         const details = {
            direction: values,
            paymentDetails: {
               method: "STRIPE",
               orderId: paymentMethod.id,
               receipt: authorization.data.response.charges.data[0].receipt_url,
            },
         }
         const res = await purchase(details)
         setLoading(false) // en realidad, este setLoading no es necesario.
         props.navigation.navigate("Checkout", {
            purchase: res.response.purchase,
         })
      } catch (e) {
         console.log(e.message)
         setError(e.message)
         setLoading(false)
      }
   }
   if (loading)
      return (
         <View style={{ alignItems: "center", justifyContent: "center" }}>
            {/* <ActivityIndicator
               animating={true}
               color={Colors.purple800}
               size="large"
            /> */}
            <PreloaderBack />
         </View>
      )
   return (
      <View>
         <ScrollView>
            <ImageBackground style={{flex:1}}source={{uri : "https://i.postimg.cc/0Q7FDTVz/fondoconfeti.png"}}>
               <HeroPages/>
               <Text style={{textAlign:'center', fontFamily:'Poppins_800ExtraBold', fontSize:25, color:'gray' }}>Pay with <Text style={{color:'#67f2cb'}}> Credit Card</Text> </Text>
            <DirectionsForm
               initialValues={initialValues}
               submitCallback={(values) => {
                  purchaseHandler(values)
               }}
               alias={false}
               buttonText="Purchase"
            >
               <CardField
                  postalCodeEnabled={false}
                  placeholder={{
                     number: "4242",
                  }}
                  cardStyle={{
                     backgroundColor: "white",
                     borderColor: "lightgray",
                     borderWidth: 1,
                     borderRadius:5,
                  }}
                  style={{
                     width: "100%",
                     height: 50,
                    
                  }}
                  onCardChange={(cardDetails) => {
                     setCardDetails(cardDetails)
                  }}
               />
            </DirectionsForm>
            {error && (
               <View>
                  <Text style={{ color: "red", textAlign:'center' }}>{error}</Text>
               </View>
            )}
            <Footer/>
            </ImageBackground>
         </ScrollView>
      </View>
   )
}

export default Stripe

const styles = StyleSheet.create({
  // card: {
  //   // backgroundColor: "#FFFFFF",
  //   width: "100%",
  // },
  // cardField: {
  //   width: "100%",
  //   height: 50,
  //   color: "#000000",
  //   backgroundColor: "#FFFFFF",
  //   width: "100%",
  // },
})
