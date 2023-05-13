import React from "react";
import ChatList from "./Chat-list";
import Chat from "./Chat";
import './Chat-page.css';

function ChatPage() {
    return (
        <div className="chat-page">
            <ChatList />
            <Chat />
        </div>
    )
}

export default ChatPage;