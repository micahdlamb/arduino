import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  user: null,
  connected: {},
  notifications: [],
  unconfirmedNotifications: 0
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

      default:
    }
    
    return {...state, ...newState}
}

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
);