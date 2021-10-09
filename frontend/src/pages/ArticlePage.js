import Header from "../components/Header"
import HeroPages from "../components/HeroPages"
import Footer from "../components/Footer"
import ArticleRelated from "../components/ArticleRelated"
import ArticleCaroulsel from "../components/ArticleCaroulsel"
import { useArticle } from "../hooks/articlesHooks"
import { connect } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"

const ArticlePage = (props) => {
   const [articles, loading, error] = useArticle(props.match.params.id)
   const {
      brand,
      decoPhotos,
      description,
      discountPrice,
      gameType,
      genres,
      hasDiscount,
      maxPlayers,
      minAge,
      minPlayers,
      name,
      photos,
      playingTime,
      price,
      size,
      stock,
      video,
      visitsCount,
      weight,
      _id,
   } = articles

   const addToCart = (id) => {
      props.updateCart("add", id)
   }

   return (
      <>
         {loading ? (
            <h1>Loading</h1>
         ) : (
            <div
               className="bodyArticle"
               style={{ backgroundImage: "url('/assets/fondoblanco.png')" }}
            >
               <HeroPages />
               <Header />
               <div className="articleData">
               <ArticleCaroulsel/> 
                  {/* <div
                     className="articlePhoto"
                     style={{
                        backgroundImage: `url(${photos ? photos[0] : []})`,
                     }}
                  ></div> */}

                  <div className="containerData">
                     <h2>{name}</h2>
                     <div className="brandPrice">
                        <div>
                           <h5>{brand ? brand.name : ""}</h5>
                        </div>
                     </div>
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
                     {genres ? (
                        genres.map((genre) => (
                           <p key={genre._id}>{genre.name}</p>
                        ))
                     ) : (
                        <p>No Genre</p>
                     )}
                     <div className="articleNameContainer">
                        <div className="articlesNames">
                           <div className="articleName">
                              <p>{gameType ? gameType.name : ""}</p>
                              <p>Size: {size}</p>
                              <p>Weight: {weight} kg</p>
                              <p>Visits: {visitsCount}</p>
                           </div>
                           <div className="articleName">
                              <p>🕘 {playingTime} min</p>
                              <p>
                                 🎮 {minPlayers} - {maxPlayers}
                              </p>
                              <p>👦 {minAge}+</p>
                              <p>STOCK: {stock}</p>
                           </div>
                        </div>
                        <div className="articleShopCont">
                           <input
                              className="articleQuantity"
                              type="number"
                              name="buy"
                              placeholder="1"
                           />
                           <img
                              id="buy"
                              onClick={() => addToCart(_id)}
                              src="/assets/buy.png"
                              alt="addCart"
                           />
                        </div>
                     </div>
                  </div>
               </div>
               <div className="articleDecoUp">
                  <div
                     className="articleDeco"
                     style={{
                        backgroundImage: `url(${
                           decoPhotos ? decoPhotos[0] : []
                        })`,
                     }}
                  ></div>
               </div>
               <div className="articleDescription">
                  <p>{description}</p>
               </div>
               <div className="articleDecoRight">
                  <div
                     className="articleDeco"
                     style={{
                        backgroundImage: `url(${
                           decoPhotos ? decoPhotos[1] : []
                        })`,
                     }}
                  ></div>
               </div>
               <div className="articleDecoDown">
                  <div
                     className="articleDeco"
                     style={{
                        backgroundImage: `url(${
                           decoPhotos ? decoPhotos[2] : []
                        })`,
                     }}
                  ></div>
               </div>
               <iframe
                  width="580"
                  height="325"
                  src={video}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  style={{ alignSelf: "center" }}
               ></iframe>
               <h3 className="articleRelatedTittle">Products related</h3>
               {/* <div className="relatedArticles">
            {articles.map((article, id) => {
               return <ArticleRelated article={article} key={id} />
            })}
         </div> */}
               
               <Footer />
            </div>
         )}
      </>
   )
}

const mapDispatchToProps = {
   updateCart: articlesActions.updateCart,
}

export default connect(null, mapDispatchToProps)(ArticlePage)
