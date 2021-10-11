import MostWanted from "../components/MostWanted"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import { TinyButton as ScrollUpButton } from "react-scroll-up-button"
import { useEffect } from "react"
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from '../components/bot/config.js'
import MessageParser from '../components/bot/MessageParser.js'
import ActionProvider from '../components/bot/ActionProvider.js'
import validateInputBot from "../components/bot/validateInputBot"

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
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
                <h1 className="logo">ludotech</h1>
                <h1 id="welcome">Welcome to the land of the game</h1>
                <Link to="/articles"><button>Let´s go there</button></Link>
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
      {/* <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText='textoCabecera'
        placeholderText='InputPlaceholder'
        validator={(e) => {validateInputBot(e)}}
      /> */}
    </>
  )
}

export default Home

/* https://i.postimg.cc/52BjNsw3/fondo-Blanco.png */

/* https://i.postimg.cc/zDhycDV6/fondoblanco2.png */

/* https://i.postimg.cc/3wVXYt59/back-Ludo3.png */
