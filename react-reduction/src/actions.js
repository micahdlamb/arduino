export const login = (username, password) => dispatch => {
    dispatch({type: 'login', user: username})
}

export const notify = (notification) => ({
    type: 'notify',
    notification
})

export const confirmNotifications = () => ({
    type: 'confirm-notifications'
})