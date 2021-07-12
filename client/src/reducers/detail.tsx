import {post} from '../actions';
import {ActionTypes, Action} from '../actions/index';


const initialState : post[] = [];

export const detailReducer = (state: post[] = initialState, action: Action) => {
	switch (action.type) {
		case ActionTypes.getDetail:
			return action.payload;
		default:
			return state;
	}
};