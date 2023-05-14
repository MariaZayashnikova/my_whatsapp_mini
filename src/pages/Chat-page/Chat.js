import React from "react";
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import CloseButton from 'react-bootstrap/CloseButton';
import { closeChat } from "../../actions";

function Chat({ activeChat, closeChat, chats }) {
    function sendMessage(e) {
        e.preventDefault();
        let message = new FormData(e.target).get('answer');

    }
    return (
        <div className="chat">
            {activeChat ? (
                <>
                    <div className="chat__info">{activeChat}
                        <CloseButton onClick={() => closeChat()} />
                    </div>
                    <div className="dialogue">
                        <Toast>
                            <Toast.Body>Сообщение от собеседника</Toast.Body>
                        </Toast>
                        <Toast className="my-message">
                            <Toast.Body>моё сообщение / my message</Toast.Body>
                        </Toast>
                    </div>
                    <div className="answer">
                        <Form onSubmit={(e) => sendMessage(e)}>
                            <Form.Group>
                                <Form.Control type="text" name="answer" id="answer" placeholder="Введите сообщение" />
                            </Form.Group>
                        </Form>
                    </div>
                </>
            ) : null}
        </div>
    )
}

const mapStateToProps = ({ activeChat, chats }) => ({ activeChat, chats })

const mapDispatchToProps = {
    closeChat
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);