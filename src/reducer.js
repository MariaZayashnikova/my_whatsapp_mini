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
                'massages': null,
            }
            let newChats = state.chats;
            newChats.push(data);
            return {
                ...state,
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
        default:
            return state
    }
}
export default reducer