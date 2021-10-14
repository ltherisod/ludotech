import { StyleSheet, Text, View } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Checkout from "../screens/Checkout"
import Stripe from "../screens/Stripe"
import Cart from "../screens/Cart"
import React from "react"

const Stack = createNativeStackNavigator()

const navigationStacKStripe = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: true }}
         />
         <Stack.Screen
            name="Stripe"
            component={Stripe}
            options={{ headerShown: true, title: "BUY" }}
         />
         <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{ headerShown: true }}
         />
      </Stack.Navigator>
   )
}

export default navigationStacKStripe

const styles = StyleSheet.create({})
