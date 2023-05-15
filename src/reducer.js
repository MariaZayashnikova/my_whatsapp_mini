const initialState = {
    loading: false,
    error: false,
    idInstance: null,
    apiTokenInstance: null,
    chats: [],
    activeChat: null
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
            return {
                ...state,
                activeChat: action.value
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
            return {
                ...state,
                chats: newChats
            }
        default:
            return state
    }
}
export default reducer