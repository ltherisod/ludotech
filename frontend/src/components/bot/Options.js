import React from "react"
import Messages from "./Messages"

const Options = (props) => {
    return (
        <div className="optionsBot">
            {Messages.map(message => {
                return (
                    <button key={message.id} className="optionsBotButton" onClick={() => {props.actionProvider.sendNewMessage(message.response)}}>{message.command}</button>
                )
            })}
        </div>
    )
}

export default Options