import React, { useEffect } from "react";
import { connect } from 'react-redux';
import ChatList from "./Chat-list";
import Chat from "./Chat";
import GreenApi from "../../services";
import { addAnotherAnswer } from '../../actions';
import './Chat-page.css';

function ChatPage({ idInstance, apiTokenInstance, addAnotherAnswer }) {
    const greenApi = new GreenApi();

    const data = {
        'idInstance': idInstance,
        'apiTokenInstance': apiTokenInstance
    }

    const checkNotification = () => {
        greenApi.getService(data, 'ReceiveNotification')
            .then(result => {
                if (result) {
                    let values = data;
                    values.receiptId = result.receiptId;
                    greenApi.deleteNotification(values);

                    let resultPhone = result.body.senderData.chatId;
                    resultPhone = resultPhone.replace(/\D/g, '');
                    addAnotherAnswer({
                        'phone': resultPhone,
                        'message': result.body
                    });
                }
            })
            .then(() => {
                checkNotification();
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        checkNotification();
    }, [])

    return (
        <div className="chat-page">
            <ChatList />
            <Chat />
        </div>
    )
}

const mapStateToProps = ({ idInstance, apiTokenInstance }) => ({ idInstance, apiTokenInstance })

const mapDispatchToProps = {
    addAnotherAnswer
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);