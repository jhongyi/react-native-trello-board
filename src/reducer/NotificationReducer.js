import * as TYPE from '../constants/ActionTypes'
import {address, port} from '../utils/settings'

const INIT_STATE = {
	'status': true,
	'msg': ''
}

export default function (state = INIT_STATE, action) {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return {
				...state,
				status: action.payload.status,
				msg: action.payload.msg
			}
		default: 
			return state;
	}
}