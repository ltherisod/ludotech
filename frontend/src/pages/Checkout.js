import Footer from "../components/Footer"
import Header from "../components/Header"
import HeroPages from "../components/HeroPages"
import usersActions from "../redux/actions/usersActions"
import Bot from "../components/bot/Bot"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

const Checkout = (props) => {
   useEffect(() => {
      window.scrollTo(0, 0)
      // eslint-disable-next-line
   }, [])

   const dispatch = useDispatch()

   const { purchase } = props.location.state.response
   const { articles, direction, status, timestamp, paymentDetails } = purchase

   return (
      <div
         className="body"
         style={{
            backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
         }}
      >
         <Bot />
         <HeroPages />
         <Header />
         <h2 className="purchaseTitle mt-5">
            Purchase <span>Summary</span>
         </h2>
         <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <div className="checkoutContainer">
               <h6 className="text-end">
                  Date: {timestamp.slice(0, 10).replace(/-/g, " / ")}
               </h6>
               <div className="d-flex align-items-center divlogoCheckout">
                  <p className="logoCheckout">
                     <span className="spanViolet">ludo</span>
                     <span className="spanRed">t</span>
                     <span className="spanGreen">e</span>
                     <span className="spanOrangi">c</span>
                     <span className="spanViolet2">h</span>
                  </p>
                  <img
                     className="imgLogoCheckout"
                     src="https://i.postimg.cc/FFjzhxf6/rubik-solo.png"
                     alt="ludoLogo"
                  ></img>
               </div>

               <hr style={{ height: "5px" }}></hr>
               <div>
                  {articles.map((article) => {
                     return (
                        <>
                           <div
                              key={article._id}
                              className="d-flex justify-content-between"
                           >
                              <div className="leftCheckout">
                                 <h4>{article.name}</h4>
                                 <p>{article.brand}</p>
                              </div>
                              <div className="rightCheckout d-flex">
                                 <h4 className="pe-5">
                                    x{" "}
                                    <span className="textQuantity">
                                       {article.quantity}
                                    </span>
                                    u
                                 </h4>
                                 {article.hasDiscount === false ? (
                                    <h4>${article.price.toFixed(2)} USD</h4>
                                 ) : (
                                    <div className="d-flex">
                                       <h4
                                          style={{
                                             textDecoration: "line-through",
                                             paddingRight: "1.2rem",
                                          }}
                                       >
                                          ${article.price.toFixed(2)}
                                       </h4>
                                       <h4>
                                          <span
                                             style={{
                                                color: "green",
                                             }}
                                          >
                                             ${article.discountPrice.toFixed(2)}
                                          </span>{" "}
                                          USD
                                       </h4>
                                    </div>
                                 )}
                              </div>
                           </div>
                           <hr style={{ height: "2px" }}></hr>
                        </>
                     )
                  })}
                  <div className="d-flex justify-content-between">
                     <h4>Total: </h4>
                     <h4>${purchase.total.toFixed(2)} USD</h4>
                  </div>
                  <hr style={{ height: "5px" }}></hr>
                  <h3>Send to:</h3>
                  <div>
                     <p>
                        <span>Street:</span>{" "}
                        <span style={{ color: "gray", marginRight: "10px" }}>
                           {direction.street}
                        </span>{" "}
                        N°{" "}
                        <span style={{ color: "gray", marginRight: "10px" }}>
                           {direction.number}
                        </span>{" "}
                        Department:{" "}
                        <span style={{ color: "gray", marginRight: "10px" }}>
                           {direction.department}
                        </span>
                     </p>
                     <p>
                        City:{" "}
                        <span style={{ color: "gray", marginRight: "10px" }}>
                           {direction.city}
                        </span>{" "}
                        State:{" "}
                        <span style={{ color: "gray", marginRight: "10px" }}>
                           {direction.state}
                        </span>{" "}
                        Zip Code:{" "}
                        <span style={{ color: "gray", marginRight: "10px" }}>
                           {direction.zipCode}
                        </span>
                     </p>
                     <p>
                        Receiver:{" "}
                        <span style={{ color: "gray", marginRight: "10px" }}>
                           {direction.receiver}
                        </span>
                     </p>
                  </div>
                  <hr style={{ height: "5px" }}></hr>
                  <div className="d-flex justify-content-between">
                     <h4>Status: </h4>
                     <h4 style={{ color: "orange" }}>{status}</h4>
                  </div>
                  <hr style={{ height: "5px" }}></hr>
                  <p>
                     Selected payment method:{" "}
                     <span style={{ color: "darkgreen" }}>
                        {paymentDetails.method === "PAYPAL"
                           ? "PAYPAL"
                           : "CREDIT CARD"}
                     </span>
                  </p>
                  <div className="d-flex justify-content-center flex-column align-items-center">
                     <img
                        src="https://i.postimg.cc/xC3sq7tJ/pngkey-com-bar-code-png-131088.png"
                        alt="codeBar"
                        style={{ width: "12vw" }}
                     />
                     {paymentDetails.method === "PAYPAL" && (
                        <p>{paymentDetails.orderId}</p>
                     )}
                     {paymentDetails.method === "STRIPE" && (
                        <>
                           <p>
                              {paymentDetails.orderId
                                 .replace(/[a-zA-Z]/g, 0)
                                 .slice(4, 23)}
                           </p>
                           <div className="bg}warning">
                              <a target='_blank' href={paymentDetails.receipt}>
                                 See additional receipt
                              </a>
                           </div>
                        </>
                     )}
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                     <button
                        type="button"
                        className="addProduct"
                        onClick={() => {
                           dispatch(usersActions.getReceipt(purchase._id))
                        }}
                        style={{
                           backgroundImage: `url("https://i.postimg.cc/GhMnJB8K/button-PDF.png")`,
                        }}
                     >
                        Download PDF
                     </button>
                  </div>
               </div>
            </div>
            <button
               type="button"
               className="addProduct mt-5"
               onClick={() => props.history.push("Home")}
               style={{
                  backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
               }}
            >
               BACK TO HOME
            </button>
         </div>
         <Footer />
      </div>
   )
}

export default Checkout
