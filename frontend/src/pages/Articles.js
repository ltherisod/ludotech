import React, { useState } from "react"
import Article from "../components/Article"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Filter from "../components/Filter"
import HeroPages from "../components/HeroPages"
import PreloaderFilter from "../components/PreloaderFilter"
import Bot from "../components/bot/Bot"

const Articles = (props) => {
   const [articles, setArticles] = useState({
      articles: [],
      page: 1,
      totalCounts: null,
      totalPages: 1,
   })
   const [loadingArticles, setLoadingArticles] = useState(true)
   const [currentPage, setCurrentPage] = useState(1)
   const filterArticles = (e) => {
      setArticles(e)
   }

   return (
      <>
         <Bot />
         <div
            className="signInBody"
            style={{
               backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
            }}
         >
            <HeroPages />
            <Header />
            <div className="bodyArticles">
               <h2 className="pb-3">
                  Art<span>i</span>cles
               </h2>
               <div className="filterContainer">
                  <Filter
                     filterArticles={(e) => filterArticles(e)}
                     currentPage={currentPage}
                     setCurrentPage={setCurrentPage}
                     setLoadingArticles={setLoadingArticles}
                  />
                  <div className="containerArticles" id="containerArticles">
                     {loadingArticles ? (
                        <PreloaderFilter />
                     ) : articles.articles.length ? (
                        articles.articles.map((article) => {
                           return (
                              <Article
                                 history={props.history}
                                 article={article}
                                 key={article._id}
                              />
                           )
                        })
                     ) : (
                        <p>No articles found.</p>
                        // dejar bonito acá también jjj
                     )}
                  </div>
                  {articles?.totalPages > 1 && (
                     <div
                        style={{
                           display: "flex",
                           gap: "1rem",
                           alignItems: "center",
                        }}
                     >
                        {currentPage > 1 && (
                           <button className="profileButton" style={{
                              backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
                           }}
                              type="button"
                              onClick={() => {
                                 window.scrollBy({
                                    top: -document.getElementById(
                                       "containerArticles"
                                    ).offsetHeight,
                                    // left: 0,
                                    behavior: "smooth",
                                 }) // mover esto, es test.
                                 setCurrentPage(currentPage - 1)
                              }}
                           >
                              Prev
                           </button>
                        )}
                        <p
                           style={{
                              margin: "0",
                              fontSize: "1.2rem",
                              color: "white",
                           }}
                        >
                           Current page: {currentPage}/{articles.totalPages}
                        </p>
                        {currentPage < articles.totalPages && (
                           <button className="profileButton" style={{
                              backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
                           }}
                              type="button"
                              onClick={() => {
                                 window.scrollBy({
                                    top: -document.getElementById(
                                       "containerArticles"
                                    ).clientHeight,
                                    left: 0,
                                    behavior: "smooth",
                                 }) // esto igual, mover después a algo decente jaja.
                                 setCurrentPage(currentPage + 1)
                              }}
                           >
                              Next
                           </button>
                        )}
                     </div>
                  )}
               </div>
            </div>
            <Footer />
         </div>
      </>
   )
}

export default Articles
