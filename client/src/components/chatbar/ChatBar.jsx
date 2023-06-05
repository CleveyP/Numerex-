import react, {useState} from "react";


export const ChatBar = () =>{
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("")
    //get new message from anyone in the room and add it to messages

    return (
        <div className="chat-bar">
            {
                messages.map(
                    (message) =>{
                        <Message 
                        message = {message.message}
                        name={message.name}
                        time={message.time}
                        />
                    }
                )
            }
            <input className="chat-input" type="text" onChange={(e) => handleChange(e)} value={userMessage} />
        </div>
    )
}