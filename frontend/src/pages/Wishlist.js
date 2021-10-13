import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector } from "react-redux"
import Article from "../components/Article"
import HeroPages from "../components/HeroPages"

const Wishlist = (props) => {
   document.title = "My wishlist"

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
         <HeroPages />
         <Header />
         {searched.length === 0 ? (
            <main className="mainWishlist">
               <h3>Your wishlist is empty</h3>
            </main>
         ) : (
            <main className="mainWishlist">
               <h2>Wish<span>list</span></h2>
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
