import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import navigationStack from "./navigationStack"
import Articles from "../screens/Articles"
import Cart from "../screens/Cart"
import SignIn from "../screens/SignIn"
import SignUp from "../screens/SignUp"
import LogOut from "../screens/LogOut"
import { connect, useSelector } from "react-redux"
import { useLoginLS } from "../hooks/usersHooks"
const Drawer = createDrawerNavigator()

const Navigator = (props) => {
  useLoginLS()
  const user = useSelector((state) => state.users.user)
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: "#444444" },
        drawerLabelStyle: {
          color: "#EDEDED",
          fontWeight: "bold",
          fontSize: 40,
        },
        drawerActiveBackgroundColor: "#171717",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={navigationStack}
        // options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Articles"
        component={Articles}
        // options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
        // options={{ headerShown: false }}
      />
      {!user && (
        <>
          <Drawer.Screen
            name="Sign In"
            component={SignIn}
            // options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Sign Up"
            component={SignUp}
            // options={{ headerShown: false }}
          />
        </>
      )}
      {user && (
        <Drawer.Screen
          name="Log Out"
          component={LogOut}
          // options={{ headerShown: false }}
        />
      )}
    </Drawer.Navigator>
  )
}

export default Navigator
