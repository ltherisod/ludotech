import React from "react"
import { connect, useSelector } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"
import { FaCartPlus } from "react-icons/fa"
import toast from "react-hot-toast"

const ArticleRelated = (props) => {
   const user = useSelector((state) => state.users.user)
   const addToCart = (e, id, value) => {
      e.stopPropagation()
      props.updateCart("add", id)
      toast.custom((t) => (
         <div
            className={`${
               t.visible ? "animate-enter" : "animate-leave"
            } bg-white flex`}
            style={{
               display: "flex",
               alignContent: "center",
               alignItems: "center",
               padding: "5px 10px",
               borderRadius: "15px",
               backgroundImage:
                  "url('https://i.postimg.cc/WzHpV97Z/testtoastop70.png')",
               backgroundPosition: "center right 50px",
               backgroundSize: "cover",
            }}
         >
            <img
               style={{ width: "55px", height: "55px" }}
               className="h-3 w-3 rounded-full"
               src="https://i.postimg.cc/jSsTk02Z/robot-Cell.png"
               alt=""
            />
            <p
               className="text-sm"
               style={{
                  marginBottom: 0,
                  color: "#ff9424",
                  fontWeight: "bold",
               }}
            >
               You have {value} to the shopping cart
            </p>
         </div>
      ))
   }

   const relatedArticlesNoRepeat = props.relatedArticles.filter(
      (arti) => arti._id !== props.match.params.id
   )

   return (
      <>
         {relatedArticlesNoRepeat.slice(0, 3).map((article) => {
            return (
               <div
                  key={article._id}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  onClick={() => props.history.push(`/article/${article._id}`)}
               >
                  <div
                     className="cardArticleRelated"
                     style={{
                        backgroundImage: `url("https://i.postimg.cc/59Rp3FW9/articlelast.png")`,
                     }}
                  >
                     <div
                        onClick={() =>
                           props.history.push(`/article/${article._id}`)
                        }
                        className="photosArticleRelated"
                        style={{
                           backgroundImage: `url('${article.photos[0]}')`,
                        }}
                     ></div>
                     <div className="gameInfoRelated">
                        <div className="priceRelated">
                           {" "}
                           {article.hasDiscount === false ? (
                              <p
                                 style={{
                                    color: "lightgreen",
                                    fontSize: 21,
                                    fontWeight: "bold",
                                 }}
                              >
                                 ${article.price.toFixed(2)} USD
                              </p>
                           ) : (
                              <div className="priceArticle">
                                 <p
                                    style={{
                                       textDecoration: "line-through",
                                       color: "lightgrey",
                                       fontSize: 21,
                                       fontWeight: "bold",
                                       paddingRight: "1.2rem",
                                    }}
                                 >
                                    ${article.price.toFixed(2)}
                                 </p>
                                 <p
                                    style={{
                                       color: "lightgreen",
                                       fontSize: 21,
                                       fontWeight: "bold",
                                    }}
                                 >
                                    ${article.discountPrice.toFixed(2)} USD
                                 </p>
                              </div>
                           )}
                        </div>
                        {user ? (
                           <div className="buyLineRelated">
                              <h5>{article.name}</h5>
                              <FaCartPlus
                                 id="buy"
                                 src="./assets/buy.png"
                                 onClick={(e) =>
                                    addToCart(e, article._id, article.name)
                                 }
                              />
                           </div>
                        ) : (
                           <div className="buyLineRelated">
                              <h5>{article.name}</h5>
                              <FaCartPlus
                                 id="buy"
                                 src="./assets/buy.png"
                                 onClick={(e) => {
                                    e.stopPropagation()
                                    toast.custom((t) => (
                                       <div
                                          className={`${
                                             t.visible
                                                ? "animate-enter"
                                                : "animate-leave"
                                          } bg-white flex`}
                                          style={{
                                             display: "flex",
                                             alignContent: "center",
                                             alignItems: "center",
                                             padding: "5px 10px",
                                             borderRadius: "15px",
                                             backgroundImage:
                                                "url('https://i.postimg.cc/WzHpV97Z/testtoastop70.png')",
                                             backgroundPosition:
                                                "center right 50px",
                                             backgroundSize: "cover",
                                          }}
                                       >
                                          <img
                                             style={{
                                                width: "55px",
                                                height: "55px",
                                             }}
                                             className="h-3 w-3 rounded-full"
                                             src="https://i.postimg.cc/jSsTk02Z/robot-Cell.png"
                                             alt=""
                                          />
                                          <p
                                             className="text-sm"
                                             style={{
                                                marginBottom: 0,
                                                color: "#ff9424",
                                                fontWeight: "bold",
                                             }}
                                          >
                                             You must log in to add an item to
                                             the shopping cart
                                          </p>
                                       </div>
                                    ))
                                 }}
                              />
                           </div>
                        )}
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
