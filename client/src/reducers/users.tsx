import {User, ActionTypes, Action, UserPremium, ActionUsersPremium} from '../actions';

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

// FACU: nuevo reducer creado
export const usersPremium = (state: UserPremium[] = [], action: ActionUsersPremium) => {
	switch (action.type) {
		case ActionTypes.loadUserPremium:
			return action.payload;
		default:
			return state;
	}
};