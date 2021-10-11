import React from "react"
import { connect } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"

const ArticleRelated = (props) => {
  const addToCart = (e, id) => {
    e.stopPropagation()
    props.updateCart("add", id)
  }

  return(
    <>
    {props.relatedArticles.map(article => {
      return (
        <div
          className="cardArticleRelated"
          style={{
            backgroundImage: `url("https://i.postimg.cc/sftdwcnd/article.png")`,
          }}
          key={article._id}
        >
          <div onClick={() => props.history.push(`/article/${article._id}`)} className="photosArticleRelated" style={{ backgroundImage: `url('${article.photos[0]}')` }} >
          </div>
          <div className="gameInfo">
            <div className="price">
              {" "}
              {article.hasDiscount === false ? (
                <p style={{ color: "green" }}>${article.price}</p>
              ) : (
                <div className="priceArticle">
                  <p style={{ textDecoration: "line-through", color: "red" }}>
                    ${article.price}
                  </p>
                  <p style={{ color: "green" }}>${article.discountPrice}</p>
                </div>
              )}
            </div>
            <div className="buyLineRelated">
                <h3>{article.name}</h3>
                <img id="buy" src="/assets/buy.png" alt="addCart" onClick={(e) => addToCart(e, article._id)}/>
            </div> 
          </div>
        </div>
      )
    })}
    </>
  )  
}

const mapDispatchToProps = {
  updateCart: articlesActions.updateCart,
}

export default connect(null, mapDispatchToProps)(ArticleRelated)