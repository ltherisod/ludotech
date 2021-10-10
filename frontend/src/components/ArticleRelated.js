import React from "react"
import { connect } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"

const ArticleRelated = (props) => {
  const {
    name,
    photos,
    price,
    hasDiscount,
    discountPrice,
    _id
  } = props.article

  const addToCart = (e, id) => {
    e.stopPropagation()
    props.updateCart("add", id)
  }

  return(
    <div
      className="cardArticleRelated"
      style={{
        backgroundImage: `url("https://i.postimg.cc/sftdwcnd/article.png")`,
      }}
    >
      <div onClick={() => props.history.push(`/article/${_id}`)} className="photosArticleRelated" style={{ backgroundImage: `url('${photos[0]}')` }} >
      </div>
      <div className="gameInfo">
        <div className="price">
          {" "}
          {hasDiscount === false ? (
            <p style={{ color: "green" }}>${price}</p>
          ) : (
            <div className="priceArticle">
              <p style={{ textDecoration: "line-through", color: "red" }}>
                ${price}
              </p>
              <p style={{ color: "green" }}>${discountPrice}</p>
            </div>
          )}
        </div>
        <div className="buyLineRelated">
            <h3>{name}</h3>
            <img id="buy" src="/assets/buy.png" alt="addCart" onClick={(e) => addToCart(e, _id)}/>
        </div> 
      </div>
    </div>
  )  
}

const mapDispatchToProps = {
  updateCart: articlesActions.updateCart,
}

export default connect(null, mapDispatchToProps)(ArticleRelated)