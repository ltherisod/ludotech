import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { usePurchase } from "../hooks/usersHooks"
import axios from "axios"
const HOST = "http://localhost:4000"

const Stripe = ({ formik, user, history }) => {
   const stripe = useStripe()
   const elements = useElements()

   const [purchase, loading, error] = usePurchase()

   const handleSubmit = async (event) => {
      event.preventDefault()

      if (!stripe || !elements) {
         return
      }

      const cardElement = elements.getElement(CardElement)

    if (error) {
      console.log("[error]", error)
    } else {
      try {
        const {
          data: { response },
        } = await axios.post(
          `${HOST}/api/stripe/payment-intent`,
          { id: paymentMethod.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        if (!data.success) throw new Error(data.error)
        const details = {
          direction: formik.values,
          paymentDetails: {
            method: "STRIPE",
            orderId: paymentMethod.id,
            receipt: response.charges.data[0].receipt_url,
          },
        }
        const res = await purchase(details)
        console.log(res)
        // aquí termina la compra... hacer checkout
        history.push({ pathname: "/checkout", state: res })
      } catch (e) {
        console.log(e)
      }
   }
   }
   return (
      <form
         onSubmit={handleSubmit}
         style={{ display: "flex", flexDirection: "column", width: "40vw" }}
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
            className="profileButton"
            style={{
               backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
            }}
            type="submit"
            disabled={!stripe || loading}
         >
            Finalize purchase
         </button>
      </form>
   )
}
export default Stripe
