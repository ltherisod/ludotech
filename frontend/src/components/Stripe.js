import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

const Stripe = () => {
  const stripe = useStripe()
  const elements = useElements()
  console.log(stripe)
  // useUtils()
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        address: {
          city: "Concepcion",
          country: "CL",
          line1: "Mikasa",
          line2: "kekeke",
          postal_code: "234123",
          state: "Por aquí",
        },
        email: "jajaja@jajaja.com",
        name: "JJ",
        phone: "12341234",
      },
    })

    if (error) {
      console.log("[error]", error)
    } else {
      console.log("[PaymentMethod]", paymentMethod)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", width: "30vw" }}
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  )
}
export default Stripe
