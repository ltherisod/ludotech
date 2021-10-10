class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider
      this.state = state
    }

    parse(message) {
        switch (message) {
            case "hello":
                this.actionProvider.handleHello()
            break
            default:
                console.log(message)
        }
    }
}

export default MessageParser