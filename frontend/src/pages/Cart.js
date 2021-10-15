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
import toast from "react-hot-toast"
import { useLoginLS } from "../hooks/usersHooks"
import Preloader from "../components/PreloaderFilter"
import { FaMoneyCheck } from "react-icons/fa"
import { Link } from "react-router-dom"

const Cart = (props) => {
   const [viewMethod, setViewMethod] = useState(false)
   const [viewButtons, setViewButtons] = useState(false)
   const user = useSelector((state) => state.users.user)
   const [loading, error] = useLoginLS()

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
         toast.custom((t) => (
            <div
               className={`${
                  t.visible ? "animate-enter" : "animate-leave"
               } bg-white flex`}
               style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  backgroundImage:
                     "url('https://i.postimg.cc/WzHpV97Z/testtoastop70.png')",
                  backgroundPosition: "center right 50px",
                  backgroundSize: "cover",
               }}
            >
               <img
                  style={{ width: "55px", height: "55px" }}
                  className="h-3 w-3 rounded-full"
                  src="https://i.postimg.cc/jSsTk02Z/robot-Cell.png"
                  alt=""
               />
               <p
                  className="text-sm"
                  style={{
                     marginBottom: 0,
                     color: "#ff9424",
                     fontWeight: "bold",
                  }}
               >
                  You must choose an address or fill out the form to continue
               </p>
            </div>
         ))
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
         <Bot />
         <div
            className="signInBody"
            style={{ backgroundImage: "url('/assets/fondoblanco2.png')" }}
         >
            <HeroPages />
            <Header />

            {loading ? (
               <Preloader />
            ) : (
               <div className="bodyCart">
                  {props.shoppingCart.length === 0 ? (
                     <div className="emptyCart">
                        <div>
                           <h2>
                              Your cart is <span>empty</span>
                           </h2>
                           <h2
                              style={{ fontSize: "5vmin", marginTop: "-.5em" }}
                           >
                              Let's <span>start</span> buying!
                           </h2>
                        </div>
                        <Link
                           className="shopLink"
                           to="/articles"
                           onClick={() => window.scrollTo(0, 0)}
                        >
                           <div
                              className="buttonShop"
                              style={{
                                 backgroundImage:
                                    "url('https://i.postimg.cc/256ZjvPG/back-Button.png')",
                              }}
                           >
                              Shop Now!
                           </div>
                        </Link>
                        <img
                           alt="ludoCel"
                           className="ludoGif"
                           src="/assets/mascotSelfie.gif"
                        />
                     </div>
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
                                    if (article.article.stock <= 0) {
                                       updateCartFunction(
                                          "delete",
                                          article.article._id
                                       )
                                    }
                                    return (
                                       <tr key={article.article._id}>
                                          <td>
                                             <div
                                                style={{
                                                   backgroundImage: `url(${article.article.photos[0]})`,
                                                   backgroundPosition: "center",
                                                   backgroundSize: "cover",
                                                   width: "80px",
                                                   height: "80px",
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
                                                <p
                                                   style={{
                                                      color: "yellowgreen",
                                                   }}
                                                >
                                                   ${" "}
                                                   {article.article.price.toFixed(
                                                      2
                                                   )}
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
                                                   ? article.article
                                                        .discountPrice
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
                                 <div className="d-flex justify-content-center">
                                    <button 
                                       className="profileButton "
                                       style={{
                                          backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
                                       }}
                                       type="button"
                                       onClick={() =>
                                          setViewMethod(!viewMethod)
                                       }
                                    >
                                       <div className="d-flex align-items-center justify-content-around px-3">
                                          <FaMoneyCheck
                                             style={{ fontSize: "1.7rem" }}
                                             className="moneyBuy me-3"
                                          />{" "}
                                          <span>Buy</span>
                                       </div>
                                    </button>
                                 </div>
                              </article>
                           </section>
                           <section
                              className="d-flex justify-content-center align-items-center flex-column" id="cartLastSection"
                              style={{ width: "90vw" }}
                           >
                              {viewMethod && (
                                 <>
                                    <h3 className="chooseAnAddress">
                                       Choose an{" "}
                                       <span className="spanCeleste">
                                          address
                                       </span>{" "}
                                       to continue
                                    </h3>
                                    <div className="cartAddressInputs">
                                       {!directions || directions.length ? (
                                          <div className="orAdaAdress">
                                             {!directions ||
                                             directions.length === 0 ? (
                                                <p className="chooseAnAddress">
                                                   There are no addresses added
                                                </p>
                                             ) : (
                                               <div style={{display:"flex", flexWrap:"wrap"}}>
                                                  { directions.map((direction) => {
                                                   return (
                                                      <AddressCard direction={direction}  key={direction._id} formik={formik}/>
                                                   )
                                                })}
                                                  </div>
                                             )}

                                             <h3 className="chooseAnAddress">
                                                Or add a{" "}
                                                <span className="spanCeleste">
                                                   new
                                                </span>{" "}
                                                address
                                             </h3>
                                             <FormCart formik={formik} />
                                          </div>
                                       ) : (
                                          <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                             <h4 className="chooseAnAddress">
                                                Add address
                                             </h4>
                                             <FormCart formik={formik} />
                                          </div>
                                       )}
                                       {!viewButtons && (
                                          <button id="finalizeYourPurchase"
                                             className="profileButton"
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
                                          <h3 className="chooseAnAddress">
                                             Pay with{" "}
                                             <span className="spanCeleste">
                                                PayPal
                                             </span>
                                          </h3>
                                          <Paypal
                                             user={user}
                                             formik={formik}
                                             history={props.history}
                                          />
                                          <h3 className="chooseAnAddress">
                                             Or pay with{" "}
                                             <span className="spanCeleste">
                                                Credit Card
                                             </span>
                                          </h3>
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
            )}

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
