import React from "react";

export const Message = (props) =>{

    return (
        <div className="message">
            <p className="message-name">{props.name}</p>
            <p className="p-message">{props.message}</p>
            <p className="p-message">{props.time}</p>
        </div>
    );
} 