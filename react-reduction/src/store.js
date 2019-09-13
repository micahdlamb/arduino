import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  user: null,
  connected: {},
  notifications: [],
  unconfirmedNotifications: 0,
  settings: {}
}

export const login = (username, password) => dispatch => {
  dispatch({type: 'login', user: username})
}

export const notify = notification => ({
  type: 'notify',
  notification
})

export const confirmNotifications = () => ({
  type: 'confirm-notifications'
})

export const fetchSettings = () => async dispatch => {
  dispatch({type: 'fetch-settings', settings: await fetch('settings').then(resp => resp.json())})
}

export const setSettings = updates => ({
  type: 'set-settings', updates
})

let timeout
function saveSettings(settings){
  clearTimeout(timeout)
  timeout = setTimeout(() => fetch('settings', {method: 'POST', body: JSON.stringify(settings)}), 1000)
}

function rootReducer(state=initialState, action) {
    let {type, ...newState} = action

    switch (type){
      case 'connected':
        let {connected} = state
        newState = {connected: {...connected, ...newState}}
        break

      case 'notify':
        let {notifications, unconfirmedNotifications} = state
        let {notification} = newState
        notification.date = new Date()
        let maxNotifications = 5
        newState = {
          notifications: [...notifications.slice(-maxNotifications), notification],
          unconfirmedNotifications: unconfirmedNotifications + 1
        }
        break

      case 'confirm-notifications':
        newState = {unconfirmedNotifications: 0}
        break

      case 'fetch-settings':
        newState = {...state, ...newState}
        break

      case 'set-settings':
        let {settings} = state
        let {updates} = newState
        newState = {settings: {...settings, ...updates}}
        saveSettings(newState.settings)
        break
        
      default:
    }
    
    return {...state, ...newState}
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
export default store

fetchSettings()(store.dispatch)