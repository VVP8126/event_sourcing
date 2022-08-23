import { useState } from "react";
import useInput from "./hooks/useInput";
import axios from "axios"
import { useEffect } from "react";

const EventSourcing = () => {

    const [messages, setMessages] = useState([]);
    const userInput = useInput("");
    
    const sendMessage = async () => {
        if(userInput.val) {
            await axios.post(
                "http://localhost:4000/new-messages",
                { message: userInput.val, id: Date.now() }
            );
        }
    }

    const subscribe = async () => {
        const eventSource = new EventSource("http://localhost:4000/connect");
        eventSource.onmessage = function(event) {
            const msg = JSON.parse(event.data);
            console.log(msg);
            setMessages(previous => [msg, ...previous]);
        }
    }
    
    useEffect(() => { subscribe(); }, []);

    return (
        <div>
            <div>
                <div className="form">
                    <input type="text" onChange={userInput.onValueChange} className="userText" />
                    <button className="btn margined" onClick={() => sendMessage()} >SEND</button>
                </div>
                <div className="messages">
                    { messages.length
                        ? messages.map(
                            m =>
                            <div className="borderedMessage" key={m.id}>
                                <h4 className="smallLetters">
                                    <b><i>{new Date(m.id).toLocaleString()}</i></b>
                                </h4>
                                <p className="leftMargined">{m.message}</p>
                            </div>)
                        : <h3 className="centered">No messages found !</h3>
                    }
                </div>
            </div>
        </div>
    )
}
export default EventSourcing;
