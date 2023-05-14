const initialState = {
    loading: false,
    error: false,
    idInstance: null,
    apiTokenInstance: null,
    chats: [],
    activeChat: null
}

const reducer = (state = initialState, action) => {
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
            let newChats = state.chats;
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
            let newMessages = state.chats.filter(() => true);
            newMessages.forEach(item => {
                if (item.phone === action.value.phone) {
                    item.messages.push({ 'my': action.value.message })
                }
            });
            return {
                ...state,
                chats: newMessages
            }
        default:
            return state
    }
}
export default reducer