import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home"
import Articles from "../screens/Articles"
import Cart from "../screens/Cart"
import SignIn from "../screens/SignIn"
import SignUp from "../screens/SignUp"
import Article from "../screens/Article"
import Profile from "../screens/Profile"
import WishList from "../screens/WishList"
import PurchasesScreen from "../screens/PurchasesScreen"

import { useSelector } from "react-redux"

const Stack = createNativeStackNavigator()

const navigationStack = () => {
   const user = useSelector((state) => state.users.user)

   return (
      <Stack.Navigator>
         <Stack.Screen
            name="HomeStack"
            component={Home}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="ArticlesStack"
            component={Articles}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="ArticleStack"
            component={Article}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="CartStack"
            component={Cart}
            options={{ headerShown: false }}
         />
         {!user && (
            <Stack.Screen
               name="SignInStack"
               component={SignIn}
               options={{ headerShown: false }}
            />
         )}
         {!user && (
            <Stack.Screen
               name="SignUpStack"
               component={SignUp}
               options={{ headerShown: false }}
            />
         )}
         {user && (
            <Stack.Screen
               name="ProfileStack"
               component={Profile}
               options={{ headerShown: false }}
            />
         )}
         {user && (
            <Stack.Screen
               name="PurchasesStack"
               component={PurchasesScreen}
               options={{ headerShown: false }}
            />
         )}
         {user && (
            <Stack.Screen
               name="WishlistStack"
               component={WishList}
               options={{ headerShown: false }}
            />
         )}
      </Stack.Navigator>
   )
}

export default navigationStack
