import React, { useEffect } from "react";
import { connect } from 'react-redux';
import ChatList from "./Chat-list";
import Chat from "./Chat";
import GreenApi from "../../services";
import { addAnotherAnswer, addSavedChats, saveWid } from '../../actions';
import { saveChats } from "../../utilities";
import './Chat-page.css';

function ChatPage({ idInstance, apiTokenInstance, addAnotherAnswer, chats, addSavedChats, saveWid }) {
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
        greenApi.getService(data, 'GetSettings')
            .then(res => {
                let wid = res.wid.replace(/\D/g, '');
                saveWid(wid);
            })
    }, [])

    useEffect(() => {
        checkNotification();
    }, [])

    useEffect(() => {
        if (chats.length > 0) saveChats(chats);
    }, [chats])

    useEffect(() => {
        if (chats.length <= 0) {
            if (sessionStorage.getItem('chats')) {
                let data = JSON.parse(sessionStorage.getItem('chats'));
                addSavedChats(data);
            }
        }
    }, [])

    return (
        <div className="chat-page">
            <ChatList />
            <Chat />
        </div>
    )
}

const mapStateToProps = ({ idInstance, apiTokenInstance, chats }) => ({ idInstance, apiTokenInstance, chats })

const mapDispatchToProps = {
    addAnotherAnswer,
    addSavedChats,
    saveWid
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);