import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
