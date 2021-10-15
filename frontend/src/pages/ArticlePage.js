import React, { useEffect } from "react"
import Header from "../components/Header"
import HeroPages from "../components/HeroPages"
import Footer from "../components/Footer"
import ArticleRelated from "../components/ArticleRelated"
import ArticleCaroulsel from "../components/ArticleCaroulsel"
import { useArticle, useRelatedArticles } from "../hooks/articlesHooks"
import { connect, useSelector } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"
import Preloader from "../components/Preloader"
import Bot from "../components/bot/Bot"
import { FaCartPlus } from "react-icons/fa"
import toast from "react-hot-toast"
import PreloaderFilter from "../components/PreloaderFilter"

const ArticlePage = (props) => {
   const user = useSelector((state) => state.users.user)
   const [article, loading] = useArticle(props.match.params.id)
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
   } = article

   const [relatedArticles, loadingRelated] = useRelatedArticles(genres)

   useEffect(() => {
      window.scroll(0, 0)
   }, [article])

   const addToCart = (id, value) => {
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

   return (
      <>
         <Bot />
         {loading ? (
            <Preloader />
         ) : (
            <div
               className="bodyArticle"
               style={{ backgroundImage: "url('/assets/fondoblanco.png')" }}
            >
               <HeroPages />
               <Header />
               <div className="articleData">
                  <ArticleCaroulsel photos={photos} />
                  <div className="containerData">
                     <h3>{name}</h3>
                     <div className="brandPrice">
                        <div>
                           <p>{brand ? brand.name.toUpperCase() : ""}</p>
                        </div>
                     </div>
                     {hasDiscount === false ? (
                        <p
                           style={{
                              color: "lightgreen",
                              fontSize: 25,
                              fontWeight: "bold",
                              textAlign: "center",
                           }}
                        >
                           ${price && price.toFixed(2)} USD
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
                              ${price.toFixed(2)}
                           </p>
                           <p
                              style={{
                                 color: "lightgreen",
                                 fontSize: 25,
                                 fontWeight: "bold",
                              }}
                           >
                              ${discountPrice.toFixed(2)} USD
                           </p>
                        </div>
                     )}
                     {genres ? (
                        genres.map((genre) => (
                           <p style={{ textAlign: "center" }} key={genre._id}>
                              {genre.name}
                           </p>
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
                           <div>
                              <p>|</p>
                              <p>|</p>
                              <p>|</p>
                              <p>|</p>
                           </div>
                           <div className="articleName2">
                              <p>🕘 {playingTime} min</p>
                              <p>
                                 🎮 {minPlayers} - {maxPlayers}
                              </p>
                              <p>👦 {minAge}+</p>
                              <p>Stock: {stock}</p>
                           </div>
                        </div>
                        {stock <= 0 ? (
                           <div>
                              <p className="text-center">
                                 Sorry, there is no stock for this product at
                                 this time. Come back later please
                              </p>
                              <div className="divCart">
                                 <FaCartPlus id="buyNoStock" />
                              </div>
                           </div>
                        ) : (
                           <>
                              {user ? (
                                 <div
                                    style={{
                                       backgroundImage: `url("https://i.postimg.cc/GhMnJB8K/button-PDF.png")`,
                                       backgroundPosition: "top",
                                    }}
                                    className="addProduct d-flex justify-content-center align-self-center"
                                 >
                                    <FaCartPlus
                                       id="buy2"
                                       src="./assets/buy.png"
                                       onClick={() => addToCart(_id, name)}
                                    />
                                 </div>
                              ) : (
                                 <div className="divCart">
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
                                                   You must log in to add an
                                                   item to the shopping cart
                                                </p>
                                             </div>
                                          ))
                                       }}
                                    />
                                 </div>
                              )}
                           </>
                        )}
                     </div>
                  </div>
               </div>
               <div className="articleDecoUp" data-aos="fade-right" data-aos-duration="1500">
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
                     data-aos="fade-left"
                     data-aos-duration="1500"
                     style={{
                        backgroundImage: `url(${
                           decoPhotos ? decoPhotos[1] : []
                        })`,
                     }}
                  ></div>
               </div>
               <div className="articleVideo">
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
               </div>
               <div className="articleDecoDown">
                  <div
                     className="articleDeco"
                     data-aos="fade-right"
                     data-aos-duration="1500"
                     style={{
                        backgroundImage: `url(${
                           decoPhotos ? decoPhotos[2] : []
                        })`,
                     }}
                  ></div>
               </div>
               <div className="divArticlesRelated">
               <h3 className="articleRelatedTittle">
                  Products <span className="spanCeleste">related</span> !
               </h3>
               <div className="relatedArticles">
                  {loadingRelated ? (
                     <PreloaderFilter />
                  ) : (
                     <ArticleRelated
                        match={props.match}
                        history={props.history}
                        relatedArticles={relatedArticles}
                     />
                  )}
               </div>

               </div>
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
