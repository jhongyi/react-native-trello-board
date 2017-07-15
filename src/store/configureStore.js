import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducer';

export default () => {
    return createStore(reducers, applyMiddleware(reduxThunk));
}
