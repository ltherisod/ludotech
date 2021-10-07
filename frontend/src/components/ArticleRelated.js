import React from "react"

const ArticleRelated = (props) => {

    const {
        name,
        photos,
        price,
        hasDiscount,
        discountPrice,
      } = props.article
    return(
        <div
        className="cardArticleRelated"
        style={{
          backgroundImage: `url("https://i.postimg.cc/sftdwcnd/article.png")`,
        }}
      >
        <div className="photosArticleRelated" style={{ backgroundImage: `url('${photos}')` }} >
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
                <img id="buy" src="./assets/buy.png" /></div>       
          </div>
      </div>
    )  
}

export default ArticleRelated