import MostWanted from "../components/MostWanted"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import { TinyButton as ScrollUpButton } from "react-scroll-up-button"
import { useEffect } from "react"
import Bot from "../components/bot/Bot"
import "animate.css"
const Home = () => {
   useEffect(() => {
      window.scrollTo(0, 0)
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
                        <h1 className="logo  animate__animated animate__fadeInUp">
                           ludotech
                        </h1>
                        <h1
                           className="animate__animated animate__fadeInUp"
                           id="welcome"
                        >
                           Welcome to the land of the game
                        </h1>
                        <Link to="/articles">
                           <button className="animate__animated animate__fadeInUp">
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
               <MostWanted />
            </main>
            <ScrollUpButton
               style={{
                  backgroundColor: "#5ccfd8",
                  fill: "white",
                  paddingBottom: "3px",
                  paddingLeft: "3px",
                  paddingRight: "3px",
                  borderRadius: "50%",
               }}
               AnimationDuration={500}
               EasingType="easeOutCubic"
               StopPosition={0}
            />
            <Footer />
         </div>
      </>
   )
}

export default Home

/* https://i.postimg.cc/52BjNsw3/fondo-Blanco.png */

/* https://i.postimg.cc/zDhycDV6/fondoblanco2.png */

/* https://i.postimg.cc/3wVXYt59/back-Ludo3.png */
