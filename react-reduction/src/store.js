import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

function rootReducer(state = {}, action) {
    let {type, ...newState} = action
    return {...state, ...newState}
}

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
);