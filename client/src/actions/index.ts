import axios from 'axios';
import { Dispatch } from 'redux';
//traermne mis actionsTypes

export interface Post {
	id: number;
	title: string;
	description: string;
	image: string;
	stock: number;
	rating: number;
	shipping: boolean;
	visibility: boolean;
	username: string;
	name: string;
	abv: number;
	og: number;
	ibu: number;
	calories: number;
	dryHop: boolean;
	volume: number;
	genericType: string;
	specificType: string;
	price: number;
	discount: number;
}

export interface SearchedPostAction {
	type: string;
	payload: Post[];
}

export interface OrderPostsByAction {
	type: string;
	payload: string;
}

const URL = 'http://localhost:3001';

export function searchedPosts(query) {
	return async function (dispatch: Dispatch) {
		const response = await axios.get<Post[]>(`${URL}/post`, { params: query })
		dispatch<SearchedPostAction>({
			type: "GET_SEARCHED_POST",
			payload: response.data
		});
	}
}

export function orderPostsBy<OrderPostsByAction>(orderBy) {
	return {
		type: "SET_ORDER_POSTS_BY",
		payload: orderBy
	}
}

export type Action = SearchedPostAction | OrderPostsByAction;