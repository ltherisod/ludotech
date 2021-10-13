import React, { useState } from "react"
import { StyleSheet, Text, View, ScrollView } from "react-native"
import { CardField, createPaymentMethod } from "@stripe/stripe-react-native"
import DirectionsForm from "../components/DirectionsForm"
import axios from "axios"
import { usePurchase } from "../hooks/usersHooks"
import { useSelector } from "react-redux"
import { ActivityIndicator, Colors } from "react-native-paper"

const HOST = "https://lodotechgames.herokuapp.com"

const Stripe = () => {
  const [cardDetails, setCardDetails] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [purchase, loadingPurchase, errorPurchase] = usePurchase()
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
    return
    if (!cardDetails?.complete) {
      console.log("ola, estoy acá")
      console.log(cardDetails)
      setError("You must complete all card details.")
      setLoading(false)
      return
    }
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
    console.log({ paymentError, paymentMethod })
    if (paymentError) {
      console.log({ "[error]": paymentError })
      setError(paymentError)
      setLoading(false)
    } else {
      try {
        const authorization = await axios.post(
          `${HOST}/api/stripe/payment-intent`,
          { id: paymentMethod.id },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        console.log(authorization.data)
        if (!authorization.data.success) {
          console.log(authorization.data.error)
          throw new Error(authorization.data.error)
        }
        const details = {
          direction: values,
          paymentDetails: {
            method: "STRIPE",
            orderId: paymentMethod.id,
            receipt: authorization.data.response.charges.data[0].receipt_url,
          },
        }
        const res = await purchase(details)
        console.log(res)
        // aquí termina la compra... hacer checkout
      } catch (e) {
        console.log(e.message)
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
  }
  if (loading)
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator
          animating={true}
          color={Colors.purple800}
          size="large"
        />
      </View>
    )
  return (
    <View>
      <ScrollView>
        <DirectionsForm
          initialValues={initialValues}
          submitCallback={(values) => {
            purchaseHandler(values)
          }}
          alias={false}
          buttonText="Pay"
        >
          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={{
              backgroundColor: "#FFFFFF",
              textColor: "#000000",
            }}
            style={{
              width: "100%",
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails)
            }}
            onFocus={(focusedField) => {
              console.log("focusField", focusedField)
            }}
          />
        </DirectionsForm>
        {error && (
          <View>
            <Text style={{ color: "red" }}>{error}</Text>
          </View>
        )}
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
