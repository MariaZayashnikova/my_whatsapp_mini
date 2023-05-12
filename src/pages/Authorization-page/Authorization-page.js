import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Authorization-page.css';

function AuthorizationPage() {
    return (
        <div className="authorization-page">
            <h3>Авторизация</h3>
            <Form className="form">
                <Form.Group className="mb-3" >
                    <Form.Label>IdInstance</Form.Label>
                    <Form.Control placeholder="IdInstance" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>ApiTokenInstance</Form.Label>
                    <Form.Control placeholder="ApiTokenInstance" />
                </Form.Group>
                <Button variant="success" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AuthorizationPage;