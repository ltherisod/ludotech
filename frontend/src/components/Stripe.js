import { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { usePurchase } from "../hooks/usersHooks"
import axios from "axios"
import PreloaderStripe from "./PreloaderStripe"
const HOST = "https://lodotechgames.herokuapp.com"

const Stripe = ({ formik, user, history }) => {
   const stripe = useStripe()
   const elements = useElements()
   const [cardReady, setCardReady] = useState(false)
   const [loading, setLoading] = useState(false)
   const [loadingStripe, setLoadingStripe] = useState(false)
   const [error, setError] = useState(null)
   const [purchase, loadingPurchase, errorPurchase] = usePurchase()

   const handleSubmit = async (event) => {
      event.preventDefault()
      setLoading(true)
      setError(null)
      if (!stripe || !elements) {
         setLoading(false)
         return
      }
      const cardElement = elements.getElement(CardElement)
      if (!cardElement._complete) {
         setError("You must fill all the credit card data.")
         setLoading(false)
         return
      }

      const { paymentError, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card: cardElement,
         billing_details: {
            address: {
               city: formik.values.city,
               country: "AR",
               line1: `${formik.values.street.trim()} ${formik.values.number}`,
               line2: formik.values.city,
               postal_code: formik.values.zipCode,
               state: formik.values.state,
            },
            email: user.email,
            name: `${user.firstname} ${user.lastname}`,
            phone: user.phone,
         },
      })

      if (paymentError || !paymentMethod) {
         setError(paymentError)
         setLoading(false)
      } else {
         try {
            setLoadingStripe(true)
            const authorization = await axios.post(
               `${HOST}/api/stripe/payment-intent`,
               { id: paymentMethod.id },
               {
                  headers: {
                     Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
               }
            )
            if (!authorization.data.success)
               throw new Error(authorization.data.error)
            const details = {
               direction: formik.values,
               paymentDetails: {
                  method: "STRIPE",
                  orderId: paymentMethod.id,
                  receipt:
                     authorization.data.response.charges.data[0].receipt_url,
               },
            }
            const res = await purchase(details)
            setLoadingStripe(false)
            history.push({ pathname: "/checkout", state: res })
         } catch (e) {
            setError(e.message)
            setLoading(false)
         }
      }
   }

   if (loadingStripe) {
      return <PreloaderStripe />
   }

   return (
      <form
         id="formStripeForResponsive"
         onSubmit={handleSubmit}
         style={{ display: "flex", flexDirection: "column" }}
      >
         <CardElement
            className="mb-5"
            options={{
               style: {
                  base: {
                     fontSize: "23px",
                     color: "#424770",
                     "::placeholder": {
                        color: "gray",
                     },
                  },
                  invalid: {
                     color: "red",
                  },
               },
            }}
         />
         <button
            id="finalizeYourPurchase"
            className="profileButton"
            style={{
               backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
               width: "100%",
            }}
            type="submit"
            disabled={!stripe || loading}
         >
            Finalize your purchase
         </button>
         {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
      </form>
   )
}
export default Stripe
