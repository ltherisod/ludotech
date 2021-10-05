import React from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"

const Article = (props) => {
   const {
      name,
      photos,
      price,
      hasDiscount,
      discountPrice,
      genres,
      gameType,
      minPlayers,
      maxPlayers,
      minAge,
      stock,
   } = props.article

   return (
      <div className="cardArticle">
         <div
            className="photosArticle"
            style={{
               backgroundImage: `url('${photos}')`,
            }}
         >
            <div className="price">
               {hasDiscount === false ? (
                  <p style={{ color: "green" }}>$ {price}</p>
               ) : (
                  <div className="priceArticle">
                     <p
                        style={{ textDecoration: "line-through", color: "red" }}
                     >
                        ${price}
                     </p>
                     <p style={{ color: "green" }}>${discountPrice}</p>
                  </div>
               )}
            </div>
         </div>
         <div>
            <h2>{name}</h2>
            <h4>Stock: {stock}</h4>
            <p>Gender: {genres}</p>
            <div>
               <p>Game type: {gameType}</p>
               <p>Minimum age: {minAge}</p>
            </div>
            <div className="backFavArticle">
               <p>
                  Players: {minPlayers} - {maxPlayers}
               </p>
               {/* <div className="backFavArticle">
                  <FaHeart className="favArticle" />
               </div> */}
               <div
                  className="circleFav"
                  //    onClick={changeFav}
               >
                  <FaRegHeart className="favArticle" />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Article
