import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import {
  CardField,
  useStripe,
  useConfirmPayment,
} from "@stripe/stripe-react-native"
import DirectionsForm from "../components/DirectionsForm"

const Stripe = () => {
  const { confirmPayment, loading } = useConfirmPayment()
  const [cardDetails, setCardDetails] = useState()
  const initialValues = {
    street: "",
    number: "",
    city: "",
    zipCode: "",
    receiver: "",
    department: "",
    state: "",
  }
  const purchaseHandler = async (values) => {
    if (!cardDetails?.completed) {
      console.log(error)
    }
    console.log(values)
  }
  return (
    <View>
      <DirectionsForm
        initialValues={initialValues}
        submitCallback={(values) => {
          console.log(values)
          console.log(formik.errors)
        }}
        alias={false}
        buttonText="Pay"
      >
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
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
    </View>
  )
}

export default Stripe

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
  },
  cardField: {
    width: "100%",
    height: 50,
    marginVertical: 30,
  },
})
