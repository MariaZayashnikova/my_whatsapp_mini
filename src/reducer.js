const initialState = {
    loading: false,
    error: false,
    idInstance: null,
    apiTokenInstance: null,
    chats: [],
    activeChat: null,
    myWid: null,
    noRead: []
}

const reducer = (state = initialState, action) => {
    let newChats;
    switch (action.type) {
        case 'setIdApi':
            return {
                ...state,
                idInstance: action.value.idInstance,
                apiTokenInstance: action.value.apiTokenInstance,
                error: false,
                loading: false
            }
        case 'setError':
            return {
                ...state,
                error: action.value
            }
        case 'savePhone':
            let data = {
                'phone': action.value,
                'messages': []
            }
            newChats = state.chats.filter(() => true);
            newChats.push(data);
            return {
                ...state,
                error: false,
                chats: newChats,
                activeChat: action.value
            }
        case 'openChat':
            let read = state.noRead.filter(() => true);
            let newRead = read.filter(item => item !== action.value)
            return {
                ...state,
                activeChat: action.value,
                noRead: newRead
            }
        case 'closeChat':
            return {
                ...state,
                activeChat: null
            }
        case 'addMyAnswer':
            newChats = state.chats.filter(() => true);
            newChats.forEach(item => {
                if (item.phone === action.value.phone) {
                    item.messages.push({ 'my': action.value.message, 'time': new Date().getTime() });
                }
            });
            return {
                ...state,
                chats: newChats
            }
        case 'addAnotherAnswer':
            newChats = state.chats.filter(() => true);
            newChats.forEach(item => {
                if (item.phone == action.value.phone) {
                    let isDouble = false;
                    item.messages.forEach(item => {
                        if (item.time === action.value.message.timestamp) {
                            isDouble = true;
                        }
                    });
                    if (!isDouble) {
                        item.messages.push({ 'another': action.value.message.messageData.textMessageData.textMessage, 'time': action.value.message.timestamp });
                    }
                }
            });
            let isRead = state.noRead.filter(() => true);
            if (action.value.phone == state.activeChat) {
                return {
                    ...state,
                    chats: newChats
                }
            } else {
                isRead.push(action.value.phone);
                return {
                    ...state,
                    chats: newChats,
                    noRead: isRead
                }
            }
        case 'addSavedChats':
            return {
                ...state,
                chats: action.value
            }
        case 'saveWid':
            return {
                ...state,
                myWid: action.value
            }
        case 'logOut':
            return {
                ...state,
                idInstance: null,
                apiTokenInstance: null
            }
        default:
            return state
    }
}
export default reducer