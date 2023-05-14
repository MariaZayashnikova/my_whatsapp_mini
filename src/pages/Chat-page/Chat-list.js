import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { savePhone, openChat } from "../../actions";

function ChatList({ savePhone, chats, openChat }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function createChat(e) {
        e.preventDefault();
        let newPhone = new FormData(e.target).get('phone');
        handleClose();
        savePhone(newPhone);
        console.log('chats', chats);
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
                            <Form.Control type="text" name="phone" id="phone" placeholder="Введите номер телефона" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Создать
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div >
    )
}

const mapStateToProps = ({ chats }) => ({ chats })

const mapDispatchToProps = {
    savePhone,
    openChat
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);