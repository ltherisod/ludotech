class ActionProvider {
    constructor(createChatbotMessage, setStateFunc, createClientMessage) {
      this.createChatbotMessage = createChatbotMessage
      this.setState = setStateFunc
      this.createClientMessage = createClientMessage
    }

    handleHello() {
        const message = this.createChatbotMessage("Hi! Welcome to Ludotech")
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message]
        }))
    }
}

export default ActionProvider