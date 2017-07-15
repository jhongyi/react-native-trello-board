import {combineReducers} from 'redux';
import trello from './TrelloReducer';
import settings from './SettingReducer';
import notification from './NotificationReducer';

const rootReducer = combineReducers({
    trello,
    settings,
    notification
})

export default rootReducer;