import React, { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import HeroPages from "../components/HeroPages"
import { connect, useSelector } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"
import Paypal from "../components/Paypal"
import Stripe from "../components/Stripe"
import FormCart from "../components/FormCart"
import { useFormik } from "formik"
import * as Yup from "yup"
import AddressCard from "../components/AddressCard"
import Bot from "../components/bot/Bot"

const Cart = (props) => {
   const [viewMethod, setViewMethod] = useState(false)
   // const [viewPaypal, setViewPaypal] = useState(false)
   // const [paymentMethod, setPaymentMethod] = useState("")
   const [viewButtons, setViewButtons] = useState(false)
   const user = useSelector((state) => state.users.user)

   const { directions } = user

   let formik = useFormik({
      initialValues: {
         receiver: "",
         street: "",
         number: "",
         department: "",
         zipCode: "",
         city: "",
         state: "",
      },
      validationSchema: Yup.object({
         receiver: Yup.string()
            .min(2, "Receiver must have at least 2 characters.")
            .required("Required"),
         street: Yup.string().required("Required"),
         number: Yup.number()
            .required("Required")
            .typeError("Must be a number"),
         department: Yup.string().required("Required"),
         zipCode: Yup.string().required("Required"),
         city: Yup.string().required("Required"),
         state: Yup.string().required("Required"),
      }),
   })

   const validateForm = async () => {
      const res = await formik.validateForm()
      if (Object.values(res).length === 0) {
         setViewButtons(true)
      } else {
         alert("You must choose an address or fill out the form to continue")
      }
   }

   let totalCost = props.shoppingCart.reduce((count, item) => {
      return (
         count +
         item.quantity *
            (item.article.hasDiscount
               ? item.article.discountPrice
               : item.article.price)
      )
   }, 0)

   let totalWithoutDiscounts = props.shoppingCart.reduce((count, item) => {
      return count + item.quantity * item.article.price
   }, 0)

   const updateCartFunction = (action, articleId) => {
      props
         .updateCart(action, articleId)
         .then((res) => {
            console.log(res)
         })
         .catch((e) => console.log(e))
   }

   return (
      <>
      <Bot/>
      <div
         className="signInBody"
         style={{ backgroundImage: "url('/assets/fondoblanco2.png')" }}
      >
         <HeroPages />
         <Header />
         <div className="bodyCart">
            {props.shoppingCart.length === 0 ? (
               <h2>Your cart is empty</h2>
            ) : (
               <>
                  <h2>Cart</h2>
                  <div className="cartContainer">
                     <table className="cartSection1">
                        <thead>
                           <tr>
                              <th></th>
                              <th className="product">Product</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th className="subtotal">Subtotal</th>
                              <th></th>
                           </tr>
                        </thead>
                        <tbody>
                           {props.shoppingCart.map((article) => {
                              return (
                                 <tr key={article.article._id}>
                                    <td>
                                       <div
                                          style={{
                                             backgroundImage: `url(${article.article.photos[0]})`,
                                             backgroundPosition: "center",
                                             backgroundSize: "cover",
                                             width: "100px",
                                             height: "100px",
                                             margin: "10px",
                                          }}
                                       ></div>
                                    </td>
                                    <td>{article.article.name}</td>
                                    <td>
                                       <div className="quantity">
                                          <button
                                             onClick={() => {
                                                updateCartFunction(
                                                   "decrement",
                                                   article.article._id
                                                )
                                             }}
                                          >
                                             {"<"}
                                          </button>

                                          <div>{article.quantity}</div>
                                          <button
                                             onClick={() => {
                                                updateCartFunction(
                                                   "increment",
                                                   article.article._id
                                                )
                                             }}
                                          >
                                             {">"}
                                          </button>
                                       </div>
                                    </td>
                                    <td>
                                       {article.article.hasDiscount ===
                                       false ? (
                                          <p style={{color: "yellowgreen"}}>
                                             ${" "}
                                             {article.article.price.toFixed(2)}
                                          </p>
                                       ) : (
                                          <div className="priceArticle">
                                             <p
                                                style={{
                                                   textDecoration:
                                                      "line-through",
                                                   color: "gray",
                                                   padding: "0px 4px",
                                                }}
                                             >
                                                $
                                                {article.article.price.toFixed(
                                                   2
                                                )}
                                             </p>
                                             <p
                                                style={{
                                                   color: "yellowgreen",
                                                   padding: "0px 4px",
                                                }}
                                             >
                                                $
                                                {article.article.discountPrice.toFixed(
                                                   2
                                                )}
                                             </p>
                                          </div>
                                       )}
                                    </td>
                                    <td>
                                       $
                                       {(
                                          article.quantity *
                                          (article.article.hasDiscount
                                             ? article.article.discountPrice
                                             : article.article.price)
                                       ).toFixed(2)}
                                    </td>
                                    <td>
                                       <div className="delete">
                                          <button
                                             onClick={() => {
                                                updateCartFunction(
                                                   "delete",
                                                   article.article._id
                                                )
                                             }}
                                          >
                                             X
                                          </button>
                                       </div>
                                    </td>
                                 </tr>
                              )
                           })}
                        </tbody>
                     </table>
                     <section className="cartSection2">
                        <article className="totalsCard">
                           <div></div>
                           <div>
                              <p>Total without discounts:</p>
                              <p
                                 style={{
                                    textDecoration: "line-through",
                                    color: "gray",
                                 }}
                              >
                                 ${totalWithoutDiscounts.toFixed(2)}
                              </p>
                           </div>
                           <div>
                              <p>Total:</p>
                              <p style={{ color: "yellowgreen" }}>
                                 ${totalCost.toFixed(2)}
                              </p>
                           </div>
                           <div>
                              <button className="profileButton"
                              style={{
                                 backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
                               }}
                                 type="button"
                                 onClick={() => setViewMethod(!viewMethod)}
                              >
                                 Buy
                              </button>
                           </div>
                        </article>
                     </section>
                     <section className="d-flex justify-content-center align-items-center flex-column">
                        {viewMethod && (
                           <>
                              <h3 className="chooseAnAddress">Choose an address to continue</h3>
                              <div className="cartAddressInputs">
                                 {!directions || directions.length ? (
                                    <div>
                                       {!directions ||
                                       directions.length === 0 ? (
                                          <p className="chooseAnAddress">There are no addresses added</p>
                                       ) : (
                                          directions.map((direction) => {
                                             return (
                                                <AddressCard
                                                   direction={direction}
                                                   key={direction._id}
                                                   formik={formik}
                                                />
                                             )
                                          })
                                       )}
                                       <h4 className="chooseAnAddress">Or add a new address</h4>
                                       <FormCart formik={formik} />
                                    </div>
                                 ) : (
                                    <div>
                                       <h4 className="chooseAnAddress">Add address</h4>
                                       <FormCart formik={formik} />
                                    </div>
                                 )}
                                 {!viewButtons && (
                                    <button className="profileButton"
                                    style={{
                                       backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
                                     }}
                                       type="button"
                                       onClick={() => validateForm()}
                                    >
                                       Continue
                                    </button>
                                 )}
                              </div>
                              {viewButtons && (
                                 <>
                                    {/* <button
                                       type="button"
                                       onClick={() =>
                                          setPaymentMethod("paypal")
                                       }
                                    >
                                       Buy with PayPal
                                    </button>
                                    <button
                                       type="button"
                                       onClick={() =>
                                          setPaymentMethod("stripe")
                                       }
                                    >
                                       Buy with credit card
                                    </button> */}
                                    <h4 className="chooseAnAddress">Pay with PayPal</h4>
                                    <Paypal
                                       user={user}
                                       formik={formik}
                                       history={props.history}
                                    />
                                    <h4 className="chooseAnAddress">Pay with credit card</h4>
                                    <Stripe
                                       user={user}
                                       formik={formik}
                                       history={props.history}
                                    />
                                 </>
                              )}
                           </>
                        )}
                     </section>
                  </div>
               </>
            )}
         </div>
         <Footer />
      </div>
      </>
   )
}

const mapStateToProps = (state) => {
   return {
      shoppingCart: state.users.shoppingCart,
   }
}

const mapDispatchToProps = {
   updateCart: articlesActions.updateCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
