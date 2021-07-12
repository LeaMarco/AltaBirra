import { Post } from "../actions/index";
import { Action } from '../actions/index';

const searchInitialState: Post[] = [];
const orderInitialState: string = "";

export const postsSearchReducer = (state: Post[] = searchInitialState, action: Action) => {
	switch (action.type) {
		case "GET_SEARCHED_POST":
			return action.payload;
		default:
			return state;
	}
};

export const postsOrderReducer = (state: string = orderInitialState, action: Action) => {
	switch (action.type) {
		case "SET_ORDER_POSTS_BY":
			return action.payload;
		default:
			return state;
	}
};