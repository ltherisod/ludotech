import React from "react"
import {NavigationContainer} from "@react-navigation/native"
import Navigator from "./navigation/navigationDrawer"
import {applyMiddleware, createStore} from "redux"
import {Provider} from "react-redux"
import rootReducer from "./redux/reducers/rootReducer.js"
import thunk from "redux-thunk"

const globalStore = createStore(rootReducer, applyMiddleware(thunk))

const App = () => {
  return (
    <Provider store={globalStore}>
      <NavigationContainer>
        <Navigator/>
      </NavigationContainer>
    </Provider>
  )
}
export default App