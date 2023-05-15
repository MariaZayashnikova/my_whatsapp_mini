import React from "react";
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import CloseButton from 'react-bootstrap/CloseButton';
import { closeChat, setError, addMyAnswer } from "../../actions";
import GreenApi from "../../services";
import { createDate } from "../../utilities";

function Chat({ activeChat, closeChat, chats, idInstance, apiTokenInstance, setError, error, addMyAnswer }) {
    const greenApi = new GreenApi();

    let messages;

    chats.forEach(item => {
        if (item.phone === activeChat) {
            messages = item.messages
        }
    })

    function sendMessage(e) {
        e.preventDefault();
        let message = new FormData(e.target).get('answer');
        let data = {
            'idInstance': idInstance,
            'apiTokenInstance': apiTokenInstance,
            'value': {
                'chatId': activeChat + '@c.us',
                'message': message
            }
        }
        e.target.reset();
        greenApi.postService(data, 'SendMessage')
            .then(value => {
                if (value.idMessage) {
                    let data = {
                        'phone': activeChat,
                        'message': message
                    }
                    addMyAnswer(data);
                }
            })
            .catch((e) => console.log('error post service', e))
    }

    return (
        <div className="chat">
            {activeChat ? (
                <>
                    <div className="chat__info">{activeChat}
                        <CloseButton onClick={() => closeChat()} />
                    </div>
                    {messages.length > 0 ? (
                        <div className="dialogue">
                            {messages.map((item, i) => {
                                return (
                                    <Toast key={i} className={item.my ? 'my-message' : null}>
                                        <Toast.Header>{createDate(item.time)}</Toast.Header>
                                        <Toast.Body>{item.my || item.another}</Toast.Body>
                                    </Toast>
                                )
                            })}
                        </div>
                    ) : null}
                    <div className="answer">
                        <Form onSubmit={(e) => sendMessage(e)}>
                            <Form.Group>
                                <Form.Control type="text" name="answer" id="answer" placeholder="Введите сообщение" maxLength={10000} />
                            </Form.Group>
                        </Form>
                    </div>
                </>
            ) : null}
        </div>
    )
}

const mapStateToProps = ({ activeChat, chats, idInstance, apiTokenInstance, error }) => ({ activeChat, chats, idInstance, apiTokenInstance, error })

const mapDispatchToProps = {
    closeChat,
    setError,
    addMyAnswer
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);