import * as TYPE from '../constants/ActionTypes'
import {address, port} from '../utils/settings'

const INIT_STATE = {
	'address': address,
	'port': port
}

export default function (state = INIT_STATE, action) {
	switch (action.type) {
		case 'SAVE_ADDRESS':
			return {
				...state,
				address: action.payload
			}
		case 'SAVE_PORT':
			return {
				...state,
				port: action.payload
			}
		default: 
			return state;
	}
}