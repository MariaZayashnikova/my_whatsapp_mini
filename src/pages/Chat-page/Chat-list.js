import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { savePhone, openChat, setError } from "../../actions";
import { ErrorMessage } from "../../utilities";

function ChatList({ savePhone, chats, openChat, setError, error }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function checkPhone(number) {
        if (/7\d\d\d\d\d\d\d\d\d\d/.test(number)) return true;
        else return false
    }

    function createChat(e) {
        e.preventDefault();
        let newPhone = new FormData(e.target).get('phone');
        if (checkPhone(newPhone)) {
            handleClose();
            savePhone(newPhone);
            console.log('chats', chats);
        } else {
            setError(true);
        }
    }

    return (
        <div className="chat-list">
            <ListGroup variant="flush">
                <ListGroup.Item>Здесь будет инфа по аккаунту</ListGroup.Item>
                <ListGroup.Item className="selected" onClick={() => handleShow()}>+ Новый чат</ListGroup.Item>
                {chats.length > 0 ? (
                    chats.map((item, i) => {
                        return (
                            <ListGroup.Item key={i} className="selected" onClick={() => openChat(item.phone)}>{item.phone}</ListGroup.Item>
                        )
                    })
                ) : null}
            </ListGroup>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создать новый чат</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => createChat(e)}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control type="phone" name="phone" id="phone" placeholder="Введите номер телефона собеседника" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        {error ? ErrorMessage('номер не соответствует формату 7ХХХХХХХХХХ') : null}
                        <Button variant="primary" onClick={handleClose}>
                            Создать
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div >
    )
}

const mapStateToProps = ({ chats, error }) => ({ chats, error })

const mapDispatchToProps = {
    savePhone,
    openChat,
    setError
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);