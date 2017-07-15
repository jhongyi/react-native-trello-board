import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore();

import App from './component/App'

const Main = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default Main;
