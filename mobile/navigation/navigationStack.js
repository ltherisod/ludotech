import React from "react"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from "../screens/Home"
import Articles from "../screens/Articles"
import Cart from "../screens/Cart"
import SignIn from "../screens/SignIn"
import SignUp from "../screens/SignUp"

const Stack = createNativeStackNavigator()

const navigationStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeStack" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="ArticlesStack" component={Articles} options={{headerShown: false}}/>
            <Stack.Screen name="CartStack" component={Cart} options={{headerShown: false}}/>
            <Stack.Screen name="SignInStack" component={SignIn} options={{headerShown: false}}/>
            <Stack.Screen name="SignUpStack" component={SignUp} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}
export default navigationStack