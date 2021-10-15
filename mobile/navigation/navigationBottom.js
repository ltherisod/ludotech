import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import Icon from "react-native-vector-icons/FontAwesome"
import { Image, StyleSheet } from "react-native"
import Navigator from "./navigationDrawer"
import Cart from "../screens/Cart"
import Home from "../screens/Home"
import Profile from "../screens/Profile"
import WishList from "../screens/WishList"
import { useSelector } from "react-redux"
import { useLoginLS } from "../hooks/usersHooks"
import usersActions from "../redux/actions/usersActions"
import NotProfile from "../screens/NotProfile"
import NotWishlist from "../screens/NotWishlist"
import navigationStacKStripe from "./navigationStacKStripe"
const bottom = createBottomTabNavigator()
const HOST = "https://lodotechgames.herokuapp.com"

const NavigationBottom = (props) => {
   const user = useSelector((state) => state.users.user)
   useLoginLS()
   const userIcon = user ? (
      <Image
         style={{ width: 35, height: 35, borderRadius: 35 }}
         source={{ uri: user.google ? user.photo : `${HOST}/${user.photo}` }}
      />
   ) : (
      <Icon name="user-circle" size={35} color={"#6fdbd2"} />
   )

   return (
      <bottom.Navigator screenOptions={{ tabBarShowLabel: false }}>
         <bottom.Screen
            name="home"
            component={Navigator}
            options={{
               tabBarIcon: ({ color, size }) => (
                  <Icon name="home" size={35} color={"#ff9424"} />
               ),
               headerShown: false,
               title: "",
            }}
         />

         {user && (
            <bottom.Screen
               name="profile"
               component={Profile}
               options={{
                  tabBarIcon: ({ color, size }) => userIcon,
                  headerShown: false,
                  title: "",
               }}
            />
         )}
         {!user && (
            <bottom.Screen
               name="profile"
               component={NotProfile}
               options={{
                  tabBarIcon: ({ color, size }) => userIcon,
                  headerShown: false,
                  title: "",
               }}
            />
         )}

         {user && (
            <bottom.Screen
               name="wishlist"
               component={WishList}
               options={{
                  tabBarIcon: ({ color, size }) => (
                     <Icon name="heart" size={35} color={"#e561ae"} />
                  ),
                  headerShown: false,
                  title: "",
               }}
            />
         )}

         {!user && (
            <bottom.Screen
               name="wishlist"
               component={NotWishlist}
               options={{
                  tabBarIcon: ({ color, size }) => (
                     <Icon name="heart" size={35} color={"#e561ae"} />
                  ),
                  headerShown: false,
                  title: "",
               }}
            />
         )}

         {user && (
            <bottom.Screen
               name="cart"
               component={navigationStacKStripe}
               options={{
                  tabBarIcon: ({ color, size }) => (
                     <Icon name="cart-plus" size={35} color={"#7c51b0"} />
                  ),
                  headerShown: false,
                  title: "",
               }}
            />
         )}
      </bottom.Navigator>
   )
}
const styles = StyleSheet.create({})

export default NavigationBottom
