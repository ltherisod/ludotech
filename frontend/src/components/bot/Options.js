import React from "react"

const Options = (props) => {
    return (
        <div className="optionsBot">
            <button className="optionsBotButton" onClick={() => {props.actionProvider.sendNewMessage("primera respuesta")}}>primero</button>
            <button className="optionsBotButton" onClick={() => {props.actionProvider.sendNewMessage("segunda respuesta")}}>segundo</button>
        </div>
    )
}

export default Options