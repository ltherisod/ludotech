import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";

import { connect } from "react-redux";
import articlesActions from "../redux/actions/articlesActions";

const Cart = (props) => {
  console.log(props.shoppingCart);

  let totalCost = props.shoppingCart.reduce((count, item) => {
    return (
      count +
      item.quantity *
        (item.article.hasDiscount
          ? item.article.discountPrice
          : item.article.price)
    );
  }, 0);

  let totalWithoutDiscounts = props.shoppingCart.reduce((count, item) => {
    return count + item.quantity * item.article.price;
  }, 0);

  const updateCartFunction = (action, articleId) => {
    props
      .updateCart(action, articleId)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  const submitSell = () => {
    console.log("sell!");
  };

  return (
      <div
        className="signInBody"
        style={{
         backgroundImage: "url('/assets/fondoblanco5.png')",
        }}
      >
        <HeroPages />
        <Header />
        <main className="bodyCart">
          <h2>Cart</h2>
          <div className="cartContainer">
          <table className="cartSection1">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Delete</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
                {props.shoppingCart.map((article) => {
                  return (
                    <tr key={article.article._id}>
                      <td><div style={{
                        backgroundImage: `url(${article.article.photos[0]})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        width: "100px",
                        height: "100px",
                        margin: "10px",
                      }}></div></td>
                      <td>{article.article.name}</td>
                      <td>
                        <button
                          onClick={() => {
                            updateCartFunction("delete", article.article._id);
                          }}
                        >
                          x
                        </button>
                      </td>
                      <td>
                          <div className="quantity">
                          <div>{article.quantity}</div>
                        <div>
                          <button
                            onClick={() => {
                              updateCartFunction(
                                "increment",
                                article.article._id
                              );
                            }}
                          >
                            +
                          </button>
                          <button
                            onClick={() => {
                              updateCartFunction(
                                "decrement",
                                article.article._id
                              );
                            }}
                          >
                            -
                          </button>
                        </div>
                          </div>
                      </td>
                      <td>
          {article.article.hasDiscount === false ? (
            <p style={{ color: "green" }}>$ {article.article.price}</p>
          ) : (
            <div className="priceArticle">
              <p style={{ textDecoration: "line-through", color: "red", padding: "0px 4px" }}>
                ${article.article.price}
              </p>
              <p style={{ color: "green", padding: "0px 4px"  }}>${article.article.discountPrice}</p>
            </div>
          )}</td>
                      <td >
                        ${article.quantity *
                          (article.article.hasDiscount
                            ? article.article.discountPrice
                            : article.article.price)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <section className="cartSection2">
            <article>
              <div>
                <p>Total without discounts:</p>
                <p style={{ textDecoration: "line-through", color: "red"}}>${totalWithoutDiscounts}</p>
              </div>
              <div>
                <p>Total with discounts:</p>
                <p>${totalCost}</p>
              </div>
            </article>
            <div onClick={submitSell}>Buy with PayPal</div>
          </section>
          </div>
        </main>
        <Footer />
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shoppingCart: state.users.shoppingCart,
  };
};

const mapDispatchToProps = {
  updateCart: articlesActions.updateCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
