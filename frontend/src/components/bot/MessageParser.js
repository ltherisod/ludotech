import Messages from "./Messages"

class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider
      this.state = state
    }

    parse(theMessage) {
        const filterMessage = Messages.filter(message => message.command === theMessage.toLowerCase())

        if (filterMessage.length === 0) {
            this.actionProvider.defaultCase()
        } else {
            this.actionProvider.sendNewMessage(filterMessage[0].response)
        }
    }
}

export default MessageParser