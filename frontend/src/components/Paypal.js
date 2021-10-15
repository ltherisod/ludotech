import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { usePurchase } from "../hooks/usersHooks"
// vendedor: sb-uomjv7984205@business.example.com, Yj6x|.ZF
// comprador: sb-un4yq8067837@personal.example.com, l.-4VDs7
// client id: AQLBli0myZ6MxdK2p_WiC1PHaS4ov9-6Sxcb10OBvFFimD5U80wTZlnbnXL21v-6nzIrxLALTqLKKSF6

const Paypal = ({ formik, user, history }) => {
  const shoppingCart = useSelector((state) => state.users.shoppingCart)
  const paypal = useRef()
  const [purchase, loading, error] = usePurchase()
  const checkout = (res) => {
    history.push({
      pathname: "/checkout",
      state: res,
    })
    window.scrollTo(0, 0)
  }
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: shoppingCart.map((item) => {
              return {
                description: `${item.quantity}x ${item.article.name}`,
                reference_id: item.article._id,
                payer: {
                  name: {
                    given_name: user.firstname,
                    surname: user.lastname,
                  },
                  email_address: user.email,
                  payer_id: user._id,
                },
                amount: {
                  value: item.article.hasDiscount
                    ? item.article.discountPrice * item.quantity
                    : item.article.price * item.quantity,
                  currency_code: "USD",
                },
                shipping: {
                  address: {
                    address_line_1: `${formik.values.street.trim()} ${
                      formik.values.number
                    }`,
                    address_line_2: formik.values.department,
                    admin_area_2: formik.values.city,
                    admin_area_1: formik.values.state,
                    postal_code: formik.values.zipCode,
                    country_code: "AR",
                  },
                },
              }
            }),
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture()
          const details = {
            direction: formik.values,
            paymentDetails: { method: "PAYPAL", orderId: order.id },
          }
          const res = await purchase(details)
          // console.log({ res, data, details })
          if (res.success) {
            checkout(res)
          }
        },
        onError: (err) => {
          console.log(err)
        },
      })
      .render(paypal.current)
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <div id="formStripeForResponsive" ref={paypal}></div>
    </div>
  )
}

export default Paypal
