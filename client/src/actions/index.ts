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
	loadUserPremium
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
		//console.log(ActionTypes)
		dispatch<FetchUsersAction>({
			type: ActionTypes.fetchUsers,
			payload: response.data,
		});
	};
};

// FACU: function "loadUsersPremium" e interface UserPremium

export interface UserPremium {
	id: number;
	username: string;
	email: string;
	name: string;
	password: string;
	premium: boolean;
	roleId: number;
	cartId: number
}

export interface UsersPremiumAction {
	type: ActionTypes.loadUserPremium;
	payload: UserPremium[];
}

export const loadUsersPremium = () => {
	return (dispatch: Dispatch) => {
		return axios.get<UserPremium[]>('http://localhost:3001/beer/premium')
		.then(response => {
			
			dispatch<UsersPremiumAction>({
				type: ActionTypes.loadUserPremium,
				payload: response.data,
			});
		})
		.catch(error => console.error('No se pudieron obtener las cervezas premium'))
		
	}
}

export type Action = FetchUsersAction;
export type ActionUsersPremium = UsersPremiumAction;

