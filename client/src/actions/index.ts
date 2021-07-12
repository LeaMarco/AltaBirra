import axios from 'axios';
import { Dispatch } from 'redux';
// import { GET_BEERS } from './typesName';
//traermne mis actionsTypes

export interface User {
	id: number;
	name: string;
	lastname: string;
}

export interface specificType {
	id:number,
	"type": "Amber",
	description: string,
	"group": "ALE",
	"genericTypeId": number
}

export interface genericType {
	id:number,
	"type": "Rubia",
	description: string
}

export interface beer {
	id:number,
	name: string,
	abv: number,
	og: number,
	ibu: number,
	calories: number,
	dryHop: false,
	volume: number,
	genericTypeId: number,
	specificTypeId: number
}

export interface countable {
	id:number,
	price: number,
	discount: number,
}


export interface post{ 
	id:number,
    title: string,
    description: string,
    image: string,
    stock: number,
    rating: number,
    shipping: false,
    visibility: true,
    beerId: number,
    userId: number,
    countableId: number
}

export enum ActionTypes {
	fetchUsers,
	deleteUser,
	getDetail 
}


export interface getDetailAction {
	type: ActionTypes.getDetail;
	payload: post;
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

export type Action = getDetailAction;

const urlDetail = 'http://localhost:3001/detailBeer'

export const getDetail = (id) => {
	return async (dispatch: Dispatch)=>{
		const response = await axios.get<post>(`${urlDetail}/${id}`)
		dispatch<getDetailAction>({
			type: ActionTypes.getDetail,
			payload:response.data,
		})
	}
}