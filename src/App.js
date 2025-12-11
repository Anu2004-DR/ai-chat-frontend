import React, { useEffect, useState } from "react";
import axios from "axios";

// Use your live backend URL
const API_URL = "https://backend-ev1a.onrender.com/api/chat";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load chat history on page load
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(API_URL);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchHistory();
  }, []);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };

    // Update UI immediately
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post(API_URL, { message: input });

      const aiMsg = { sender: "ai", text: res.data.reply };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error sending message:", error);

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error: Could not get AI response." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>AI Chat App</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "msg user" : "msg ai"}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
