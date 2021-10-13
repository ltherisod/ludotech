import React, { useState } from "react"
import { StyleSheet, Text, View, ScrollView } from "react-native"
import { CardField, createPaymentMethod } from "@stripe/stripe-react-native"
import DirectionsForm from "../components/DirectionsForm"
import axios from "axios"
import { usePurchase } from "../hooks/usersHooks"
import { useSelector } from "react-redux"

const HOST = "https://lodotechgames.herokuapp.com"

const Stripe = () => {
  const [cardDetails, setCardDetails] = useState()
  const [purchase, loading, error] = usePurchase()
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
    console.log(cardDetails)
    if (!cardDetails?.completed) {
      console.log(cardDetails)
    }
    console.log(values)
    const { error, paymentMethod } = await createPaymentMethod({
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
    console.log({ error, paymentMethod })
    if (error) {
      console.log("[error]", error)
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
        if (!authorization.data.success)
          throw new Error(authorization.data.error)
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
        console.log(e)
      }
    }
  }
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
            // placeholder={{
            //   number: "",
            // }}
            cardStyle={styles.card}
            style={styles.cardField}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails)
            }}
            onFocus={(focusedField) => {
              console.log("focusField", focusedField)
            }}
          />
        </DirectionsForm>
      </ScrollView>
    </View>
  )
}

export default Stripe

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  cardField: {
    width: "100%",
    height: 50,
  },
})
