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
            "pk_test_51Ji6QGLXO1yt6E5TrzSlNMus3jsfhpwkHVkVuoa8hyNm7T868IUnXyP3m23bba4GhdLRdHx2ZrGLvATupFy4Oa4N00bt9D3tFF"
          }
        >
          <NavigationContainer>
            <NavigationBottom />
          </NavigationContainer>
        </StripeProvider>
      </Provider>
    )
  }
}
export default App
