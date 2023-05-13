import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import GreenApi from "../../services";
import { setIdApi, setError } from "../../actions";
import './Authorization-page.css';

function AuthorizationPage({ setIdApi, error, setError }) {
    const greenApi = new GreenApi();

    function onSignIn(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let data = {
            'idInstance': formData.get('IdInstance'),
            'apiTokenInstance': formData.get('ApiTokenInstance')
        }

        greenApi.getService(data, 'getStateInstance')
            .then(value => {
                if (value.stateInstance === "authorized") setIdApi(data);
                else setError(true);
            })
            .catch(() => setError(true));
    }

    function ErrorMessage() {
        return (
            <div className="error-message">
                <p>Что-то пошло не так... Убедитесь что:</p>
                <p>1. Ваш аккаунт в GREEN-API находится в статусе "авторизован"</p>
                <p>2. Ваш аккаунт в GREEN-API может принимать/отправлять сообщения, сокет открыт</p>
            </div>
        )
    }

    return (
        <div className="authorization-page">
            <h3>Авторизация</h3>
            <Form className="form" onSubmit={(e) => onSignIn(e)}>
                <Form.Group className="mb-3" >
                    <Form.Label>IdInstance</Form.Label>
                    <Form.Control placeholder="IdInstance" name="IdInstance" id="IdInstance" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>ApiTokenInstance</Form.Label>
                    <Form.Control placeholder="ApiTokenInstance" name="ApiTokenInstance" id="ApiTokenInstance" />
                </Form.Group>
                <Button variant="success" type="submit">
                    Войти
                </Button>
            </Form>
            {error ? <ErrorMessage /> : null}
        </div>
    )
}

const mapStateToProps = ({ loading, error }) => ({ loading, error })

const mapDispatchToProps = {
    setIdApi,
    setError
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage);