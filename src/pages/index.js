"use client"
import { useState, useEffect, useRef } from "react";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const socket = useRef(null);

    useEffect(() => {
        socket.current = new WebSocket("ws://localhost:8000/ws/chat");

        socket.current.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        return () => {
            socket.current.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket.current && newMessage.trim()) {
            socket.current.send(newMessage);
            setNewMessage("");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Chat Application</h1>
            <div
                style={{
                    border: "1px solid #ccc",
                    height: "300px",
                    overflowY: "scroll",
                    marginBottom: "10px",
                    padding: "10px",
                }}
            >
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ marginRight: "10px" }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
