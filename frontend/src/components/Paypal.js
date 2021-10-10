import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { usePurchase } from "../hooks/usersHooks"
import DirectionsForm from "./DirectionsForm"
// vendedor: sb-uomjv7984205@business.example.com, Yj6x|.ZF
// comprador: sb-un4yq8067837@personal.example.com, l.-4VDs7
// client id: AQLBli0myZ6MxdK2p_WiC1PHaS4ov9-6Sxcb10OBvFFimD5U80wTZlnbnXL21v-6nzIrxLALTqLKKSF6

const Paypal = ({ formik }) => {
   const shoppingCart = useSelector((state) => state.users.shoppingCart)
   const paypal = useRef()
   const [purchase, loading, error] = usePurchase()
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
                        amount: {
                           value: item.article.hasDiscount
                              ? item.article.discountPrice * item.quantity
                              : item.article.price * item.quantity,
                           currency_code: "USD",
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
               console.log({ res, data, details })
            },
            onError: (err) => {
               console.log(err)
            },
         })
         .render(paypal.current)
   }, [])

   return (
      <div className="container d-flex flex-column align-items-center justify-content-center">
         <div ref={paypal}></div>
      </div>
   )
}

export default Paypal
