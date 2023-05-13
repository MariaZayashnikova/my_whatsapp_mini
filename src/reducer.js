const initialState = {
    loading: false,
    error: false,
    idInstance: null,
    apiTokenInstance: null
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
        default:
            return state
    }
}
export default reducer