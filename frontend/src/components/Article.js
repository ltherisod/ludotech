import React from "react"

const Article = (props) => {
   const {
      name,
      img,
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
            className="imgArticle"
            style={{
               backgroundImage: `url('${img}')`,
            }}
         >
            {hasDiscount === false ? (
               <p style={{ color: "green" }}>$ {price}</p>
            ) : (
               <div className="priceArticle">
                  <p style={{ textDecoration: "line-through", color: "red" }}>
                     ${price}
                  </p>
                  <p style={{ color: "green" }}>${discountPrice}</p>
               </div>
            )}
         </div>
         <div className="price">
            <h2>{name}</h2>
            <h4>Stock: {stock}</h4>
            <p>{genres}</p>
            <div>
               <p>{gameType}</p>
               <p>{minAge}</p>
            </div>
            <div>
               <p>{minPlayers}</p>
               <p>{maxPlayers}</p>
            </div>
         </div>
      </div>
   )
}

export default Article
