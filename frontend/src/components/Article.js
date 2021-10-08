import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { connect } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"

const Article = (props) => {
  const {
    name,
    photos,
    price,
    hasDiscount,
    genres,
    gameType,
    minAge,
    _id
  } = props.article;

  const addToCart = (id) => {
    props.updateCart("add", id)
  }

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
              <p style={{ textDecoration: "line-through", color: "red", padding: "0px 4px" }}>
                ${price}
              </p>
              <p style={{ color: "green", padding: "0px 4px"  }}>${props.article.discountPrice}</p>
            </div>
          )}
        </div>
        <h3>{name}</h3>
        <div className="gameDetails">
          <p>
            <img src="./assets/gener.png" /> {genres.map(genre => genre.name)}
          </p>
          <p>
            <img src="./assets/type.png" /> {gameType.name}
          </p>
          <div className="buyLine">
          <p>
            <img src="./assets/age.png" /> {minAge}
          </p>
          <img onClick={() => addToCart(_id)} id="buy" src="./assets/buy.png" />
          </div>       
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  updateCart: articlesActions.updateCart,
}

export default connect(null, mapDispatchToProps)(Article)
