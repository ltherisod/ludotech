import React, { useState } from "react"
import Article from "../components/Article"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Filter from "../components/Filter"
import HeroPages from "../components/HeroPages"

const Articles = (props) => {
  const [articles, setArticles] = useState({
    articles: [],
    page: 1,
    totalCounts: null,
    totalPages: null,
  })
  const [currentPage, setCurrentPage] = useState(2)
  const filterArticles = (e) => {
    console.log(e)
    setArticles(e)
  }
  return (
    <>
      <div
        className="signInBody"
        style={{
          backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
        }}
      >
        <HeroPages />
        <Header />
        <div className="bodyArticles">
          <h2>Articles</h2>
          <div className="filterContainer">
            <Filter
              filterArticles={(e) => filterArticles(e)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            <div className="containerArticles">
              {articles.articles.map((article) => {
                return (
                  <Article
                    history={props.history}
                    article={article}
                    key={article._id}
                  />
                )
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Articles
