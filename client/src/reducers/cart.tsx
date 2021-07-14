import {post} from '../actions';
import {ActionTypes, Action} from '../actions/index';


const initialState : post[] = [];

export const cartReducer = (state: post[] = initialState, action: Action) => {
	switch (action.type) {
		case ActionTypes.getCart:
			//verificar si tambient engo que retornar el state
			return [...state, ...action.payload]
		default:
			return state;
	}
};