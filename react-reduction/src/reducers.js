const initialState = {
    user: null,
}

function rootReducer(state = initialState, action) {
    switch (action.type){
        case "LOGIN":
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}