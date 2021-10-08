import React, { useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import articlesActions from "../redux/actions/articlesActions"

const Article = (props) => {
   const [fav, setFav] = useState(false)
   const {
      name,
      photos,
      price,
      hasDiscount,
      genres,
      gameType,
      minAge,
      _id,
      discountPrice,
   } = props.article

   const addToCart = (e, id) => {
      e.stopPropagation()
      props.updateCart("add", id)
   }

   const handleFav = (e) => {
      e.stopPropagation()
      setFav(!fav)
   }

   return (
      <div
         style={{ textDecoration: "none", cursor: "pointer" }}
         onClick={() => props.history.push(`/article/${_id}`)}
      >
         <div
            className="cardArticle"
            style={{
               backgroundImage: `url("https://i.postimg.cc/sftdwcnd/article.png")`,
            }}
         >
            <div
               className="photosArticle"
               style={{ backgroundImage: `url('${photos}')` }}
            >
               <div className="circleFav" onClick={(e) => handleFav(e)}>
                  {!fav ? <FaRegHeart /> : <FaHeart />}
               </div>
            </div>
            <div className="gameInfo">
               <div className="price">
                  {" "}
                  {hasDiscount === false ? (
                     <p
                        style={{
                           color: "lightgreen",
                           fontSize: 25,
                           fontWeight: "bold",
                        }}
                     >
                        ${price} USD
                     </p>
                  ) : (
                     <div className="priceArticle">
                        <p
                           style={{
                              textDecoration: "line-through",
                              color: "lightgrey",
                              fontSize: 25,
                              fontWeight: "bold",
                              paddingRight: "1.2rem",
                           }}
                        >
                           ${price}
                        </p>
                        <p
                           style={{
                              color: "lightgreen",
                              fontSize: 25,
                              fontWeight: "bold",
                           }}
                        >
                           ${discountPrice} USD
                        </p>
                     </div>
                  )}
               </div>
               <h3>{name}</h3>
               <div className="gameDetails">
                  <p>
                     <img src="./assets/gener.png" />{" "}
                     {genres.map((genre) => genre.name)}
                  </p>
                  <p>
                     <img src="./assets/type.png" /> {gameType.name}
                  </p>
                  <div className="buyLine">
                     <p>
                        <img src="./assets/age.png" /> {minAge}
                     </p>
                     <img
                        onClick={(e) => addToCart(e, _id)}
                        id="buy"
                        src="/assets/buy.png"
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

const mapDispatchToProps = {
   updateCart: articlesActions.updateCart,
}

export default connect(null, mapDispatchToProps)(Article)
