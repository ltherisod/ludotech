// import Messages from "./Messages"

class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider
      this.state = state
    }

    parse(theMessage) {
        // Messages.filter(message => message.command === theMessage.toLowerCase())
        switch (theMessage.toLowerCase()) {
            case "primero":
                this.actionProvider.sendNewMessage("primera respuesta")
            break
            case "segundo":
                this.actionProvider.sendNewMessage("segunda respuesta")
            break
            case "tercero":
                this.actionProvider.sendNewMessage("tercera respuesta")
            break
            default:
                this.actionProvider.defaultCase()
        }
    }
}

export default MessageParser