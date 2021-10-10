import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import Navigator from "./navigation/navigationDrawer"
import {applyMiddleware, createStore} from "redux"
import {Provider} from "react-redux"
import {useFonts,Poppins_100Thin, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold, Poppins_900Black } from '@expo-google-fonts/poppins'
import rootReducer from "./redux/reducers/rootReducer.js"
import thunk from "redux-thunk"
import AppLoading from 'expo-app-loading'

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

  if(!fontsLoaded){
    return <AppLoading/>
  }else{
    return (
      <Provider store={globalStore}>
        <NavigationContainer>
          <Navigator/>
        </NavigationContainer>
      </Provider>
    )
  }
  
}
export default App
