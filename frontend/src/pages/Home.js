import MostWanted from "../components/MostWanted"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import Bot from "../components/bot/Bot"
import "animate.css"
import NewArticlesCarousel from "../components/NewArticlesCarousel"

const Home = (props) => {
   useEffect(() => {
      window.scrollTo(0, 0)
      // eslint-disable-next-line
   }, [])

   return (
      <>
         <Bot />
         <Header />
         <div
            className="body"
            style={{
               backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
            }}
         >
            <main>
               <div
                  className="hero"
                  style={{
                     backgroundImage: `url("https://i.postimg.cc/QdTXy2Wx/herofixed.png")`,
                  }}
               >
                  <div className="heroDescription">
                     <div>
                        <h1 className="logo  animate__animated animate__fadeInUp animate__delay-2s">
                           ludotech
                        </h1>
                        <h1
                           className="animate__animated animate__fadeInUp animate__delay-3s"
                           id="welcome"
                        >
                           Welcome to the land of the games
                        </h1>
                        <Link to="/articles">
                           <button className="animate__animated animate__fadeInUp animate__delay-4s">
                              Let´s go there
                           </button>
                        </Link>
                     </div>
                  </div>
                  <div
                     className="cube"
                     style={{ backgroundImage: "url('/assets/rubik.png')" }}
                  ></div>
               </div>
               <MostWanted history={props.history} />
               <h2 className="mostWantedTittle" style={{textAlign: 'center', marginTop: '15vh'}}><span>Latest</span> products</h2>
               <NewArticlesCarousel history={props.history} />
            </main>
            <Footer />
         </div>
      </>
   )
}

export default Home

/* https://i.postimg.cc/52BjNsw3/fondo-Blanco.png */

/* https://i.postimg.cc/zDhycDV6/fondoblanco2.png */

/* https://i.postimg.cc/3wVXYt59/back-Ludo3.png */
