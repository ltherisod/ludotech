import { createChatBotMessage } from 'react-chatbot-kit'

const config = {
  botName: "nombreDelBot",
  initialMessages: [createChatBotMessage(`mensajeInicial`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "red"
    },
    chatButton: {
      backgroundColor: "green"
    } 
  }
}

export default config