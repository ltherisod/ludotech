import React from "react"
import { useSelector, useDispatch } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"

const iconUser = "https://i.postimg.cc/pd1gvVR7/iconuser1.png"

const Header = (props) => {
  const user = useSelector((state) => state.users.user)
  const dispatch = useDispatch()

  return (
    <View id="mainNav">
      <View>
        <Text id="navLogo">Ludotech</Text>
        <View id="navbarResponsive">
          {/* <View>
                    <Text>Home</Text>
                    <Text>Articles</Text>
                    {user.isAdmin &&
                        <Text>Admin</Text>
                    }
                    {!user ? (
                    <>
                        <Text>Sign Up</Text>
                        <Text>Sign In</Text>
                    </>
                    ) : (
                        <Text onPress={() => {dispatch(usersActions.logOut())}}>Log Out</Text>
                    )}
                </View> */}
          <View>
            <Image source={{ uri: user ? user.photo : iconUser }} />
          </View>
          <FontAwesome name="bell" size={24} color="black" />
          <FontAwesome name="heart" size={24} color="black" />
          <FontAwesome5 name="shopping-cart" size={24} color="black" />
        </View>
      </View>
    </View>
  )
}

// window.addEventListener("DOMContentLoaded", () => {
//   var navbarShrink = function () {
//     const navbarCollapsible = document.body.querySelector("#mainNav")
//     if (!navbarCollapsible) {
//       return
//     }
//     if (window.scrollY === 0) {
//       navbarCollapsible.classList.remove("navbar-shrink")
//     } else {
//       navbarCollapsible.classList.add("navbar-shrink")
//     }
//   }
//   navbarShrink()
//   document.addEventListener("scroll", navbarShrink)
//   const navbarToggler = document.body.querySelector(".navbar-toggler")
//   const responsiveNavItems = [].slice.call(
//     document.querySelectorAll("#navbarResponsive .nav-link")
//   )
//   responsiveNavItems.map(function (responsiveNavItem) {
//     return responsiveNavItem.addEventListener("click", () => {
//       if (window.getComputedStyle(navbarToggler).display !== "none") {
//         navbarToggler.click()
//       }
//     })
//   })
// })

export default Header

const styles = StyleSheet.create({
  mainNav: {
    backgroundColor: 'transparent'
  }
})
