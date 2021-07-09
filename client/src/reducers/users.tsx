import {User} from '../actions';
import {ActionTypes, Action} from '../actions/index';




export const usersReducer = (state: User[] = [], action: Action) => {


	switch (action.type) {
		case ActionTypes.fetchUsers:
			return action.payload;
		default:
			return state;
	}
};






export const asd = (state: User[] = [], action: Action) => {
	switch (action.type) {
		case ActionTypes.fetchUsers:
			return action.payload;
		default:
			return state;
	}
};