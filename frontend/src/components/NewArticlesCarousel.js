import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { connect, useSelector } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"
import { FaCartPlus } from "react-icons/fa"
import toast from "react-hot-toast"
import {useMediaQuery} from "react-responsive"

const NewArticlesCarousel = (props) => {

  const [lastArticles, setLastArticles] = useState([])
  const user = useSelector((state) => state.users.user)
  
  useEffect (() => {
    async function getLastArticles() {
      try {
        let response = await props.getLastArticles()
        setLastArticles(response.response)
      } catch (e) {
        console.log(e)
      }
    }
    getLastArticles()
    // eslint-disable-next-line
  }, [])

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
                "url('https://i.postimg.cc/D0zYct9S/card-Style56.png')",
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

 const isMobile = useMediaQuery({query:"(max-width:576px)"})

  return (
    <div data-aos="fade-up">
      <Swiper
        style={{width:'80%', height:'60vh', margin:'5vh auto', marginTop:'10vh', }}
        className='swiperHomeLastArticles'
        grabCursor={true}
        navigation={true}
        pagination={false}
        spaceBetween={30} 
        slidesPerView={isMobile ? 1 : 3}
        loop={true}
        autoplay={{"dealy": 3500, "disableOnInteraction": false, pauseOnMouseEnter: false}}
        >
        {lastArticles && lastArticles.map((article, index) => (
            <SwiperSlide key={`slide-${index}`}>
              <div className="swiperHomeSlide" style={{height:'100%',  }}>
                <div
                  key={article._id}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  onClick={() => props.history.push(`/article/${article._id}`)}
                >
                  <div
                    className="cardArticleRelated"
                    style={{
                        backgroundImage: `url("https://i.postimg.cc/sftdwcnd/article.png")`,
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
                                              "url('https://i.postimg.cc/D0zYct9S/card-Style56.png')",
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
              </div>
            </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  )
}

const mapDispatchToProps = {
  getLastArticles: articlesActions.getLastArticles,
  updateCart: articlesActions.updateCart,

}

export default connect(null, mapDispatchToProps)(NewArticlesCarousel)