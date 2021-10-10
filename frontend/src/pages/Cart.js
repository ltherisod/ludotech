import React, { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import HeroPages from "../components/HeroPages"
import { Link } from "react-router-dom"
import { connect, useSelector } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"
import Paypal from "../components/Paypal"
import Address from "../components/Address"
import FormCart from "../components/FormCart"
import { useFormik } from "formik"
import * as Yup from "yup"
import AddressCard from "../components/AddressCard"

const Cart = (props) => {
  const [viewPaypal, setViewPaypal] = useState(false)
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
      number: Yup.number().required("Required").typeError("Must be a number"),
      department: Yup.string().required("Required"),
      zipCode: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
    }),
  })

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
    <div
      className="signInBody"
      style={{ backgroundImage: "url('/assets/fondoblanco2.png')" }}
    >
      <HeroPages />
      <Header />
      <div className="bodyCart">
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
                            updateCartFunction("decrement", article.article._id)
                          }}
                        >
                          {"<"}
                        </button>

                        <div>{article.quantity}</div>
                        <button
                          onClick={() => {
                            updateCartFunction("increment", article.article._id)
                          }}
                        >
                          {">"}
                        </button>
                      </div>
                    </td>
                    <td>
                      {article.article.hasDiscount === false ? (
                        <p style={{ color: "green" }}>
                          $ {article.article.price.toFixed(2)}
                        </p>
                      ) : (
                        <div className="priceArticle">
                          <p
                            style={{
                              textDecoration: "line-through",
                              color: "gray",
                              padding: "0px 4px",
                            }}
                          >
                            ${article.article.price.toFixed(2)}
                          </p>
                          <p
                            style={{
                              color: "green",
                              padding: "0px 4px",
                            }}
                          >
                            ${article.article.discountPrice.toFixed(2)}
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
                            updateCartFunction("delete", article.article._id)
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
          <div className="d-flex flex-column col-5">
            {!directions || directions.length ? (
              <div>
                {!directions || directions.length === 0 ? (
                  <p>There are no addresses added</p>
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
                <FormCart formik={formik} />
              </div>
            ) : (
              <FormCart formik={formik} />
            )}
            <div>{viewPaypal && <Paypal user={user} formik={formik} />}</div>
          </div>
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
                <p style={{ color: "green" }}>${totalCost.toFixed(2)}</p>
              </div>
              <div onClick={submitSell}>
                <button
                  type="button"
                  onClick={() => setViewPaypal(!viewPaypal)}
                >
                  Buy with PayPal
                </button>
              </div>
            </article>
          </section>
        </div>
      </div>
      <Footer />
    </div>
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
