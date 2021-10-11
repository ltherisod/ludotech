import Footer from "../components/Footer"
import Header from "../components/Header"
import HeroPages from "../components/HeroPages"

const Checkout = (props) => {
   const { purchase } = props.location.state.response
   const { articles, direction, status, timestamp } = purchase
   console.log(purchase)
   return (
      <div
         className="body"
         style={{
            backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
         }}
      >
         <HeroPages />
         <Header />
         <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="checkoutContainer">
               <h6 className="text-end">
                  Date: {timestamp.slice(0, 10).replace(/-/g, " / ")}
               </h6>
               <h1>Purchase Summary</h1>
               <hr style={{ height: "5px" }}></hr>
               <div>
                  {articles.map((article, index) => {
                     return (
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
                              <h4>${article.price} USD</h4>
                           </div>
                        </div>
                     )
                  })}
                  <hr style={{ height: "2px" }}></hr>
                  <div className="d-flex justify-content-between">
                     <h4>Total: </h4>
                     <h4>${purchase.total} USD</h4>
                  </div>
                  <hr style={{ height: "5px" }}></hr>
                  <h3>Send to:</h3>
                  <div>
                     <p>
                        Street: {direction.street} - State: {direction.state} -
                        City: {direction.city}
                     </p>
                     <p>
                        Number: {direction.number} - Department:{" "}
                        {direction.department} - Zip Code: {direction.zipCode}
                     </p>
                     <p>Receiver: {direction.receiver}</p>
                  </div>
                  <hr style={{ height: "5px" }}></hr>
                  <div className="d-flex justify-content-between">
                     <h4>STATUS: </h4>
                     <h4 style={{ color: "orange" }}>{status}</h4>
                  </div>
                  <hr style={{ height: "5px" }}></hr>
                  <h3 className="text-center bold">Dowloand PDF</h3>
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
