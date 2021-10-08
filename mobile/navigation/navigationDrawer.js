import React from "react"
import {createDrawerNavigator} from "@react-navigation/drawer"
import navigationStack from "./navigationStack"
// import SignIn from "../screens/SignIn"
// import SignUp from "../screens/SignUp"
// import LogOut from "../components/LogOut"
import {connect} from "react-redux"

const Drawer = createDrawerNavigator()

const Navigator = (props) => {
    return (
        <Drawer.Navigator screenOptions={{
            drawerStyle: {backgroundColor: "#444444"},
            drawerLabelStyle: {color: "#EDEDED", fontWeight: "bold", fontSize: 40},
            drawerActiveBackgroundColor: "#171717"
        }}>
            <Drawer.Screen name="Home" component={navigationStack} options={{headerShown: false}}/>
            {/* {!props.userToken && <Drawer.Screen name="Sign In" component={SignIn} options={{headerShown: false}}/>}
            {!props.userToken && <Drawer.Screen name="Sign Up" component={SignUp} options={{headerShown: false}}/>}
            {props.userToken && <Drawer.Screen name="Log Out" component={LogOut} options={{headerShown: false}}/>} */}
        </Drawer.Navigator>
    )
}

const mapStateToProps = (state) => {
    return {
        userToken: state.users.token
    }
}

export default connect(mapStateToProps)(Navigator)