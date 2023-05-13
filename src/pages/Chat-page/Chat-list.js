import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';

function ChatList() {
    return (
        <div className="chat-list">
            <ListGroup variant="flush">
                <ListGroup.Item>Здесь будет инфа по аккаунту</ListGroup.Item>
                <ListGroup.Item>+ Новый чат</ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default ChatList;