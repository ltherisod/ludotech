import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import Navigator from "./navigation/navigationDrawer"
import { applyMiddleware, createStore } from "redux"
import { Provider } from "react-redux"
import AppLoading from "expo-app-loading"

import {
   useFonts,
   Poppins_100Thin,
   Poppins_200ExtraLight,
   Poppins_300Light,
   Poppins_400Regular,
   Poppins_500Medium,
   Poppins_600SemiBold,
   Poppins_700Bold,
   Poppins_800ExtraBold,
   Poppins_900Black,
} from "@expo-google-fonts/poppins"
import rootReducer from "./redux/reducers/rootReducer.js"
import thunk from "redux-thunk"
import NavigationBottom from "./navigation/navigationBottom"
import { StripeProvider } from "@stripe/stripe-react-native"
import Toast from "react-native-toast-message"
import { StatusBar } from "react-native"

const globalStore = createStore(rootReducer, applyMiddleware(thunk))

const App = () => {
   let [fontsLoaded] = useFonts({
      Poppins_100Thin,
      Poppins_200ExtraLight,
      Poppins_300Light,
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
      Poppins_700Bold,
      Poppins_800ExtraBold,
      Poppins_900Black,
   })

   if (!fontsLoaded) {
      return <AppLoading />
   } else {
      return (
         <Provider store={globalStore}>
            <StripeProvider
               publishableKey={
                  "pk_test_51JkDbaJ0EgYdzOiaQQrCLVFVSFDVPFNbqYxCDyig97ePOGiE10seuI8bQWjoVvHeLbBCBTd0XWXhYa8VVS7aUB5I00CTqCoMtt"
               }
            >
               <NavigationContainer>
                  <StatusBar backgroundColor="#000" barStyle="white" />
                  <NavigationBottom />
               </NavigationContainer>
            </StripeProvider>
            <Toast ref={(tt) => Toast.setRef(tt)} />
         </Provider>
      )
   }
}
export default App
