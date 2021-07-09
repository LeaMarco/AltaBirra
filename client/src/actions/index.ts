import axios from 'axios';
import {Dispatch} from 'redux';
import { GET_BEERS } from './typesName';
//traermne mis actionsTypes

export interface User {
	id: number;
	name: string;
	lastname: string;
}

export enum ActionTypes {
	fetchUsers,
	deleteUser,
}


export interface FetchUsersAction {
	type: ActionTypes.fetchUsers;
	payload: User[];
}

export interface DeleteUserAction {
	type: ActionTypes.deleteUser;
	payload: number;
}

const url = 'http://localhost:3001/beers';

export const fetchUsers = () => {

	return async (dispatch: Dispatch) => {
		const response = await axios.get<User[]>(url);
console.log(ActionTypes)
		dispatch<FetchUsersAction>({
			type: ActionTypes.fetchUsers,
			payload: response.data,
		});
	};
};
export type Action = FetchUsersAction;