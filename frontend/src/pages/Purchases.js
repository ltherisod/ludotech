import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Bot from "../components/bot/Bot"
import HeroPages from "../components/HeroPages"
import axios from "axios"
import { useSelector } from "react-redux"

const Purchases = () => {
   const [search, setSearch] = useState("")
   const [purchases, setPurchases] = useState([])
   const [searched, setSearched] = useState([])

   const user = useSelector((state) => state.users.user)

   useEffect(() => {
      axios
         .get(`https://lodotechgames.herokuapp.com/api/user/purchases/${user._id}`, {
            headers: { Authorization: "Bearer " + user.token },
         })
         .then((res) => {
            setPurchases(res.data.response)
            setSearched(res.data.response)
         })
         .catch((e) => console.log(e))
      // eslint-disable-next-line
   }, [])

   const searchPurchase = (value) => {
      setSearched(
         purchases.filter((purchase) =>
            purchase._id
               .replace(/ /g, "")
               .toUpperCase()
               .startsWith(value.replace(/ /g, "").toUpperCase())
         )
      )
   }

   return (
      <div
         style={{
            backgroundImage:
               "url('https://i.postimg.cc/3wVXYt59/back-Ludo3.png')",
            backgroundSize: "cover",
         }}
      >
         <Bot />
         <Header />
         <HeroPages />
         <div className="mainWishlist">
            <h2 style={{ color: "white" }}>
               <span>My</span> Purchases
            </h2>
            <div className="searchbarWishlist">
               <p>
                  If you have a lot purchases, you can search each one of them
                  here
               </p>
               <input
                  type="search"
                  placeholder="Search a purchase by order ID..."
                  onChange={(e) => searchPurchase(e.target.value)}
               />
            </div>
            <div className="purchasesUserContainer">
               {searched &&
                  searched.map((purchase) => <Purchase purchase={purchase} />)}
            </div>
         </div>
         <Footer />
      </div>
   )
}

export default Purchases

const Purchase = ({ purchase }) => {
   const [color, setColor] = useState("red")

   useEffect(() => {
      purchase.status === "processing" && setColor("purple")
      purchase.status === "confirmed" && setColor("blue")
      purchase.status === "cancelled" && setColor("red")
      purchase.status === "shipping" && setColor("orange")
      purchase.status === "completed" && setColor("green")
      // eslint-disable-next-line
   }, [])

   return (
      <div
         className="userFoundPurchase"
         style={{
            backgroundImage:
               "url('https://i.postimg.cc/WzHpV97Z/testtoastop70.png')",
         }}
      >
         <div className="containerPurchase">
            <div className="titlesPurchasesUser">
               <p>Order ID</p>
               <p>Address</p>
               <p>Date</p>
               <p>Amount</p>
               <p>Status</p>
            </div>
            <div className="detailsPurchaseUser">
               <div>
                  <p>{purchase._id}</p>
               </div>
               <div>
                  <p>1074 Av. Rivadavia 23454 4B</p>
                  <p id="noneForResponsive">Buenos Aires, CABA</p>
               </div>
               <div>
                  <p>2021-10-11</p>
               </div>
               <div>
                  <p>${purchase.total}.00</p>
               </div>
               <div className={`statusPurchasePanel ${color}`}>
                  <p>{purchase.status}</p>
               </div>
            </div>
            <div className="articlesFoundPanel">
               {purchase.articles.map((article) => {
                  return (
                     <div key={article._id} className="productRow">
                        <div
                           className="productRowtPicture"
                           style={{
                              backgroundImage: `url("${article.photos[0]}")`,
                           }}
                        ></div>
                        <div className="detailsProductPanel">
                           <p className="nameProductPanel">{article.name}</p>
                           <span>
                              <p style={{ marginRight: "2vmin" }}>
                                 Price: ${article.price}
                              </p>
                              <p>Quantity: {article.quantity}</p>
                           </span>
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>
      </div>
   )
}
