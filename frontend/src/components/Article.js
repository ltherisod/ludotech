import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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
  } = props.article;

  return (
    <div
      className="cardArticle"
      style={{
        backgroundImage: `url("https://i.postimg.cc/sftdwcnd/article.png")`,
      }}
    >
      <div className="photosArticle" style={{ backgroundImage: `url('${photos}')` }} >
        <div className="circleFav" //    onClick={changeFav} 
        >
          <FaRegHeart className="favArticle" />
        </div>
      </div>
      <div className="gameInfo">
        <div className="price">
          {" "}
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
        <h3>{name}</h3>
        <div className="gameDetails">
          <p>
            <img src="./assets/gener.png" /> {genres}
          </p>
          <p>
            <img src="./assets/type.png" /> {gameType}
          </p>
          <div className="buyLine">
          <p>
            <img src="./assets/age.png" /> {minAge}
          </p>
          <img id="buy" src="./assets/buy.png" /></div>       
        </div>
      </div>
    </div>
  );
};

export default Article;
