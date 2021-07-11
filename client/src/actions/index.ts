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
	createPost,
	editPost
}

export interface PostValues {
	beer: {
	  name: string;
	  abv: number;
	  og: number;
	  ibu: number;
	  calories: number;
	  dryHop: boolean;
	  volume: number;
	  genericType: string;
	  specificType: string;
	};
	infoPost: {
	  title: string;
	  description: string;
	  image: string;
	  stock: number;
	  rating: number;
	  shipping: boolean;
	  visibility: boolean;
	  username: string;
	};
	countable: {
	  price: number;
	  discount: number;
	};
  };

  export interface EditValues {
	beer: {
	  name: string;
	  abv: number;
	  og: number;
	  ibu: number;
	  calories: number;
	  dryHop: boolean;
	  volume: number;
	  genericType: string;
	  specificType: string;
	};
	infoPost: {
	  title: string;
	  description: string;
	  image: string;
	  stock: number;
	  rating: number;
	  shipping: boolean;
	  visibility: boolean;
	  username: string;
	};
	countable: {
	  price: number;
	  discount: number;
	};
	postId:number;
  };


export interface FetchUsersAction {
	type: ActionTypes.fetchUsers;
	payload: User[];
}

export interface DeleteUserAction {
	type: ActionTypes.deleteUser;
	payload: number;
}

export interface CreatePostAction {
	type: ActionTypes.createPost;
	payload: PostValues;
}

export interface EditPostAction {
	type: ActionTypes.editPost;
	payload: EditValues;
}

export interface Action {
	type: any;
	payload: any;
}



const url = 'http://localhost:3001/beers';
const urlpost = 'http://localhost:3001/post';
const urledit = 'http://localhost:3001/edit';



export const fetchUsers = () => {
	return async (dispatch: Dispatch) => {
		const response = await axios.get<User[]>(url);
		dispatch<FetchUsersAction>({
			type: ActionTypes.fetchUsers,
			payload: response.data,
		});
	};
};


export const createPost = (data) => {
	return async (dispatch: Dispatch) => {
		const response = await axios.post<PostValues>(urlpost,{params:data});
		console.log(ActionTypes)
		dispatch<Action>({
			type: ActionTypes.createPost,
			payload: response.data,
		});
	};
};


export const editPost = (data) => {
	console.log(data,"data create post action")
	return async (dispatch: Dispatch) => {
		const response = await axios.put<EditValues>(urledit,{params:data});
		dispatch<Action>({
			type: ActionTypes.editPost,
			payload: response.data,
		});
	};
};

export type PostAction = CreatePostAction;
export type UserAction = FetchUsersAction;
export type ActionAll = Action;


