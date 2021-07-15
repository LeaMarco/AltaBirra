import {post} from '../actions';
import {ActionTypes, Action} from '../actions/index';


const initialState : post[] = [];

export const cartReducer = (state: post[] = initialState, action: Action) => {
	switch (action.type) {
		case ActionTypes.getCart:
			return [...state, ...action.payload]

		case ActionTypes.delPostInCart:
			return [...action.payload]
			
		default:
			return state;
	}
};