import React from "react";
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';

function Chat() {
    return (
        <div className="chat">
            <div className="chat__info">номер собеседника</div>
            <div className="dialogue">
                <Toast>
                    <Toast.Body>Сообщение от собеседника</Toast.Body>
                </Toast>
                <Toast className="my-message">
                    <Toast.Body>моё сообщение / my message</Toast.Body>
                </Toast>
            </div>
            <div className="answer">
                <Form>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Введите сообщение" />
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Chat;