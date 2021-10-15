import React, { useState } from "react"
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from './config.js'
import MessageParser from './MessageParser.js'
import ActionProvider from './ActionProvider.js'
import validateInputBot from "./validateInputBot"
import "./bot.css"

const Bot = () => {
    const [renderBot, setRenderBot] = useState(false)

    return (
        <div className="botContainer">
            {renderBot && 
            <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
                headerText='Chat with Ludo!'
                placeholderText='Write a message...'
                validator={validateInputBot}
            />
            }
            <div style={{cursor: 'pointer'}} onClick={() => {setRenderBot(!renderBot)}} className="buttonRenderBot">
                <img className="botGif" src="/assets/mascotSearch.gif" alt="botGif"/>
            </div>
        </div>
    )
}

export default Bot
