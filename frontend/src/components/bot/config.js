import React from 'react'
import { createChatBotMessage } from 'react-chatbot-kit'
import Options from "./Options"

const config = {
  botName: "Ludo",
  initialMessages: [createChatBotMessage(`Hello! I'm Ludo, your personal bot assistant`, {widget: "options"})],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props}/>
    }
  ]
}

export default config