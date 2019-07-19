export const login = (username, password) => dispatch => {
    dispatch({type: 'login', user: username})
}