import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import Navigator from "./navigation/navigationDrawer"
import { applyMiddleware, createStore } from "redux"
import { Provider } from "react-redux"
import AppLoading from "expo-app-loading"
import { ToastProvider } from "react-native-toast-notifications"

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
import { FontAwesome, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons'
import {View, Text} from 'react-native'

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
          <ToastProvider 
              renderType={{
                custom_type: (toast) => {
                  console.log(toast)
                  return (
                    <View style={{padding: 15, backgroundColor: toast.data.color}}>
                    <Text>{toast.data.title}</Text>
                    <Text>{toast.message}</Text>
                  </View>
                  )
                }
              }}
              // placement="bottom"
              // duration={4000}
              // animationType='zoom-in'
              // animationDuration={250}
              // successColor="green"
              // dangerColor="red"
              // dangerColor="red"
              // warningColor="orange"
              // normalColor="gray"
              // icon={<Entypo name="hand" size={24} color="white" />}
              // successIcon={<FontAwesome5 name="check-circle" size={24} color="white" />}
              // dangerIcon={<MaterialIcons name="cancel" size={24} color="white" />}
              // warningIcon={<FontAwesome name="warning" size={24} color="white" />}
              // textStyle={{ fontSize: 20 }}
              // offset={50}
              // offsetTop={30}
              // offsetBottom={40}
              // swipeEnabled={true}
              // renderToast={(toast) => {
              //   <View style={{padding: 15, backgroundColor: 'grey'}}>
              //     <Text>{toast.message}</Text>
              //   </View>
              >
            <NavigationContainer>
              <NavigationBottom />
            </NavigationContainer>
          </ToastProvider>
        </StripeProvider>
      </Provider>
    )
  }
}
export default App
