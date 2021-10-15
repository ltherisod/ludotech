import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import rootReducer from "./redux/reducers/rootReducer"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Toaster } from "react-hot-toast"
import ScrollButton from "./components/ScrollButton"

// const PK = 'pk_test_51Ji6QGLXO1yt6E5TrzSlNMus3jsfhpwkHVkVuoa8hyNm7T868IUnXyP3m23bba4GhdLRdHx2ZrGLvATupFy4Oa4N00bt9D3tFF' Esta es cuenta Jona.
const PK =
   "pk_test_51JkDbaJ0EgYdzOiaQQrCLVFVSFDVPFNbqYxCDyig97ePOGiE10seuI8bQWjoVvHeLbBCBTd0XWXhYa8VVS7aUB5I00CTqCoMtt"
const stripePromise = loadStripe(PK)

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
   <React.StrictMode>
      <Toaster
         containerStyle={{
            top: 80,
            left: 20,
            bottom: 20,
            right: 20,
         }}
         toastOptions={{
            duration: 1500,
         }}
      />
      <Provider store={store}>
         <Elements stripe={stripePromise}>
            <App />
         </Elements>
      </Provider>
      <ScrollButton />
   </React.StrictMode>,
   document.getElementById("root")
)
