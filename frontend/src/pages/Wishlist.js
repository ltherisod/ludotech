import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector } from "react-redux"
import Article from "../components/Article"
import Bot from "../components/bot/Bot"
import HeroPages from "../components/HeroPages"
import { Link } from "react-router-dom"

const Wishlist = (props) => {

   const wishlist = useSelector((state) => state.users.wishList)
   const [searched, setSearched] = useState([])

   useEffect(() => {
      setSearched(wishlist)
   }, [wishlist])

   const searchProduct = (value) => {
      setSearched(
         wishlist.filter((product) =>
            product.name
               .replace(/ /g, "")
               .toUpperCase()
               .startsWith(value.replace(/ /g, "").toUpperCase())
         )
      )
   }

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
         {searched.length === 0 ? (
            <main className="mainWishlist">
               <div className="emptyCart">
                  <div>
                     <h3 className="titleWish">
                        Your wishlist is{" "}
                        <span className="spanCeleste">empty</span>
                     </h3>
                     <h3 className="titleWish2">
                        Let's start{" "}
                        <span className="spanCeleste">searching!</span>
                     </h3>
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
            </main>
         ) : (
            <main className="mainWishlist">
               <h2>
                  Wish<span>list</span>
               </h2>
               <div className="searchbarWishlist">
                  <p>
                     If you have many products in your wishlist, you can search
                     each one of them here
                  </p>
                  <input
                     type="search"
                     placeholder="🔍 Search a product..."
                     onChange={(e) => searchProduct(e.target.value)}
                  />
               </div>
               <div className="containerArticles">
                  {searched.length > 0 &&
                     searched.map((article) => {
                        return (
                           <Article
                              article={article}
                              key={article._id}
                              history={props.history}
                           />
                        )
                     })}
               </div>
            </main>
         )}

         <Footer />
      </div>
   )
}

// wishlist.length > 0 &&

export default Wishlist
