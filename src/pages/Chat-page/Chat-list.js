import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { savePhone, openChat, setError, logOut } from "../../actions";
import { ErrorMessage } from "../../utilities";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ChatList({ savePhone, chats, openChat, setError, error, myWid, logOut, noRead }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function checkPhone(number) {
        return /^7\d\d\d\d\d\d\d\d\d\d/.test(number)
    }

    function createChat(e) {
        e.preventDefault();
        let newPhone = new FormData(e.target).get('phone');
        if (checkPhone(newPhone)) {
            handleClose();
            savePhone(newPhone);
        } else {
            setError(true);
        }
    }

    function LogOut() {
        sessionStorage.clear();
        logOut();
    }

    return (
        <div className="chat-list">
            <ListGroup variant="flush">
                <ListGroup.Item className="settings bg_grey">
                    <span>{myWid}</span>
                    <Button variant="light" onClick={() => LogOut()}>Выйти</Button>
                </ListGroup.Item>
                <ListGroup.Item className="selected" onClick={() => handleShow()}>+ Новый чат</ListGroup.Item>
                {chats.length > 0 ? (
                    chats.map((item, i) => {
                        return (
                            <ListGroup.Item key={i} className={noRead.includes(item.phone) ? "chat-list-item selected" : "selected"} onClick={() => openChat(item.phone)}>
                                {item.phone}
                                {noRead.includes(item.phone) ? <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" color="green" /> : null}
                            </ListGroup.Item>
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
                            <Form.Control type="phone" name="phone" id="phone" autoFocus placeholder="Введите номер телефона собеседника" />
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

const mapStateToProps = ({ chats, error, myWid, noRead }) => ({ chats, error, myWid, noRead })

const mapDispatchToProps = {
    savePhone,
    openChat,
    setError,
    logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);