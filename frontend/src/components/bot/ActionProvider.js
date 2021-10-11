class ActionProvider {
    constructor(createChatbotMessage, setStateFunc, createClientMessage) {
      this.createChatbotMessage = createChatbotMessage
      this.setState = setStateFunc
      this.createClientMessage = createClientMessage
    }

    sendNewMessage(mensaje) {
        const message = this.createChatbotMessage(mensaje)
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message]
        }))
    }

    defaultCase() {
        const message = this.createChatbotMessage("I don't understand that, sorry :(")
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message]
        }))
    }
}

export default ActionProvider