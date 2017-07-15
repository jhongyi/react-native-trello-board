import * as TYPE from '../constants/ActionTypes';

import axios from 'axios';
import {address, port} from '../utils/settings'
const ROOT_URL = `http://${address}:${port}`;

export function getOrganizations() {
	return function(dispatch, getState) {
		axios.get(`${ROOT_URL}/api/v1.0/organizations`)
		.then(response => {
			dispatch({
				type: TYPE.GET_ORGANIZATIONS,
				payload: response.data
			})
			dispatch({
				type: TYPE.SET_NOTIFICATION,
				payload: {
					'status': true,
					'msg': ''
				}
			})
		})
		.catch((error) => {
			dispatch({
				type: TYPE.SET_NOTIFICATION,
				payload: {
					'status': false,
					'msg': error
				}
			});
		});
	}
}

export function getTeams() {
	return function(dispatch, getState) {
		axios.get(`${ROOT_URL}/api/v1.0/teams`)
		.then(response => {
			dispatch({
				type: TYPE.GET_TEAMS,
				payload: response.data
			})
		})
		.catch((error) => {
			dispatch(handleError(error.response,error));
		});
	}
}

export function getLists(board_id) {
	return function(dispatch, getState) {
		axios.get(`${ROOT_URL}/api/v1.0/lists/${board_id}`)
		.then(response => {
			dispatch({
				type: TYPE.GET_LISTS,
				payload: response.data
			})
		})
		.catch((error) => {
			dispatch(handleError(error.response,error));
		});
	}
}

export function getCards(list_id) {
	return function(dispatch, getState) {
		axios.get(`${ROOT_URL}/api/v1.0/list/${list_id}`)
		.then(response => {
			dispatch({
				type: TYPE.GET_CARDS,
				payload: response.data
			})
		})
		.catch((error) => {
			dispatch(handleError(error.response,error));
		});
	}
}

export function addBoard(team_item) {
	return function(dispatch, getState) {
		axios.post(`${ROOT_URL}/api/v1.0/boards`, {
			board_name: team_item.board_name,
			team_id: team_item.select_team
		})
		.then(response => {
			dispatch({
				type: TYPE.ADD_BOARD,
				payload: response.data
			})
		})
		.catch((error) => {
			dispatch(handleError(error.response,error));
		});
	}
}

export function addList(list_item) {
	return function(dispatch, getState) {
		axios.post(`${ROOT_URL}/api/v1.0/lists/add`, {
			board_id: list_item.board_id,
			list_name: list_item.list_name
		})
		.then(response => {
			dispatch({
				type: TYPE.ADD_LIST,
				payload: response.data
			})
		})
		.catch((error) => {
			dispatch(handleError(error.response,error));
		});
	}	
}

export function addCard(card_item) {
	return function(dispatch, getState) {
		axios.post(`${ROOT_URL}/api/v1.0/card/add`, {
			list_id: card_item.list_id,
			name: card_item.card_name,
			image: card_item.image
		})
		.then(response => {
			dispatch({
				type: TYPE.ADD_CARD,
				payload: response.data
			})
		})
		.catch((error) => {
			dispatch(handleError(error.response,error));
		});
	}
}

export function setSelectBoard(board_id) {
	return function(dispatch, getState) {
		dispatch({
			type: TYPE.SET_SELECTED_BOARD,
			payload: board_id
		})
	}
}

export function setSelectList(list_id) {
	return function(dispatch, getState) {
		dispatch({
			type: TYPE.SET_SELECTED_LIST,
			payload: list_id
		})
	}
}

export function setSelectCard(card_id) {
	return function(dispatch, getState) {
		dispatch({
			type: TYPE.SET_SELECTED_CARD,
			payload: card_id
		})
	}
}

export function setSelectedImage(img_path) {
	return function(dispatch, getState) {
		dispatch({
			type: TYPE.SET_SELECTED_IMAGE,
			payload: img_path
		})
	}
}

export function addSetting(settings) {
	return function(dispatch, getState) {
		dispatch({
			type: TYPE.SAVE_ADDRESS,
			payload: settings.address
		})
		dispatch({
			type: TYPE.SAVE_PORT,
			payload: settings.port
		})
	}
}