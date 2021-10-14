import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"
import PreloaderFilter from "./PreloaderFilter"

const MostWanted = (props) => {
   const [mostVisitArticles, setMostVisitArticles] = useState([])
   const [loading, setLoading] = useState(true)
   useEffect(() => {
      props
         .getMostVisitArticles()
         .then((res) => {
            setMostVisitArticles(res.response ?? [])
            setLoading(false)
         })
         .catch((e) => console.log(e))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   if (loading) return <PreloaderFilter />
   if (!mostVisitArticles.length) return <p>Error...</p> // manejar esto!
   return (
      <>
         <div className="mostWantedConteiner">
            <h2 className="mostWantedTittle">
               Most <span>wanted</span> products
            </h2>
            <div
               data-aos="fade-right"
               className="mostWantedCard"
               style={{
                  backgroundImage:
                     "url('https://i.postimg.cc/5yHSybcS/card-Style56left.png')",
                  textDecoration: "none",
                  cursor: "pointer",
               }}
               onClick={() =>
                  props.history.push(`/article/${mostVisitArticles[0]._id}`)
               }
            >
               <div className="mostWantedGameConteiner">
                  <h2 className="mostWantedGameBrand">
                     {mostVisitArticles[0].name}
                  </h2>
                  <div
                     className="mostWantedGame"
                     style={{
                        backgroundImage: `url('${mostVisitArticles[0].photos[0]}')`,
                     }}
                  ></div>
               </div>
            </div>
            <div
               data-aos="fade-left"
               className="mostWantedCard"
               style={{
                  backgroundImage:
                     "url('https://i.postimg.cc/D0zYct9S/card-Style56.png')",
                  textDecoration: "none",
                  cursor: "pointer",
               }}
               onClick={() =>
                  props.history.push(`/article/${mostVisitArticles[1]._id}`)
               }
            >
               <div className="mostWantedGameConteinerLeft">
                  <div
                     className="mostWantedGame"
                     style={{
                        backgroundImage: `url('${mostVisitArticles[1].photos[0]}')`,
                     }}
                  ></div>
                  <h2 className="mostWantedGameBrand">
                     {mostVisitArticles[1].name}
                  </h2>
               </div>
            </div>
            <div
               className="mostWantedCard"
               data-aos="fade-right"
               style={{
                  backgroundImage:
                     "url('https://i.postimg.cc/5yHSybcS/card-Style56left.png')",
                  textDecoration: "none",
                  cursor: "pointer",
               }}
               onClick={() =>
                  props.history.push(`/article/${mostVisitArticles[2]._id}`)
               }
            >
               <div className="mostWantedGameConteiner">
                  <h2 className="mostWantedGameBrand">
                     {mostVisitArticles[2].name}
                  </h2>
                  <div
                     className="mostWantedGame"
                     style={{
                        backgroundImage: `url('${mostVisitArticles[2].photos[0]}')`,
                     }}
                  ></div>
               </div>
            </div>
         </div>
      </>
   )
}

const mapDispatchToProps = {
   getMostVisitArticles: articlesActions.getMostVisitArticles,
}

export default connect(null, mapDispatchToProps)(MostWanted)
