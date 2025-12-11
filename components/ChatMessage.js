import React from "react";

const ChatMessage = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`message-row ${isUser ? "user" : "ai"}`}>
      <div className="message-bubble">
        <div className="message-sender">
          {isUser ? "You" : "AI"}
        </div>
        <div className="message-text">{text}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
