import { Post, QueryTypes } from "../actions/index";
import { Action } from '../actions/index';

const searchInitialState: Post[] = [];

const initialQuery: QueryTypes = {};

const initialFavoritePosts: Post[] = [];

export const postsSearchReducer = (state: Post[] = searchInitialState, action: Action) => {
	switch (action.type) {
		case "GET_SEARCHED_POST":
			return action.payload;
		default:
			return state;
	}
};

export const postsSearchQueryReducer = (state: QueryTypes = initialQuery, action: Action) => {
	switch (action.type) {
		case "SET_QUERY_SEARCH":
			return { ...state, ...action.payload };
		case "SET_TITLE_SEARCH":
			return { title: action.payload };
		default:
			return state;
	}
};

export const postsFavoritesReducer = (state: Post[] = initialFavoritePosts, action: Action) => {
	switch (action.type) {
		case "GET_FAVORITE_POSTS":
			return action.payload;
		default:
			return state;
	}
};