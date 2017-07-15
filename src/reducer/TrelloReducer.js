import * as TYPE from '../constants/ActionTypes'

const INIT_STATE = {
	organizations: {},
	teams: {},
	lists: {},
	cards: {},
	board_id: '',
	list_id: '',
	card_id: '',
	img_path: ''
}

export default function (state = INIT_STATE, action) {
	switch (action.type) {
		case 'GET_ORGANIZATIONS':
			return {
				...state,
				organizations: action.payload
			}
		case 'GET_TEAMS':
			return {
				...state,
				teams: action.payload
			}
		case 'GET_LISTS':
			return {
				...state,
				lists: action.payload
			}
		case 'GET_CARDS':
			return {
				...state,
				cards: action.payload
			}
		case 'ADD_BOARD':
			return state;
		case 'ADD_LIST':
			return state;
		case 'ADD_CARD':
			return state;
		case 'SET_SELECTED_BOARD':
			return {
				...state,
				board_id: action.payload
			}
		case 'SET_SELECTED_LIST':
			return {
				...state,
				list_id: action.payload
			}
		case 'SET_SELECTED_CARD':
			return {
				...state,
				card_id: action.payload
			}
		case 'SET_SELECTED_IMAGE':
			return {
				...state,
				img_path: action.payload
			}
		case 'SAVE_ADDRESS':
			return {
				...state,
				settings: {
					address: action.payload
				}
			}
		/*case 'DELETE_WORK_ITEM':
			return {
				...state,
				work_list: [
					...state.work_list.slice(0, action.payload),
					...state.work_list.slice(
						parseInt(action.payload) + 1, state.work_list.length
					),
				]
			}*/
		default: 
			return state;
	}
}