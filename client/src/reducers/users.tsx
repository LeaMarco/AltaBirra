import {ActionTypes, UserPremium, ActionUsersPremium, iuserData, ActionUserData, ActionLoginTypes } from '../actions';

// export const usersReducer = (state: User[] = [], action: Action) => {

// 	switch (action.type) {
// 		case ActionTypes.fetchUsers:
// 			return action.payload;
// 		default:
// 			return state;
// 	}
// };


// export const asd = (state: User[] = [], action: Action) => {
// 	switch (action.type) {
// 		case ActionTypes.fetchUsers:
// 			return action.payload;
// 		default:
// 			return state;
// 	}
// };

// FACU: nuevo reducer creado
export const usersPremium = (state: UserPremium[] = [], action: ActionUsersPremium) => {
	switch (action.type) {
		case ActionTypes.loadUserPremium:
			return action.payload;
		default:
			return state;
	}
};


export const userData = (state: iuserData[] = [], action: ActionUserData) => {
	switch (action.type) {
		case ActionTypes.ActionUserDataType:
			return action.payload;
		default:
			return state;
	}
};

export const login = (state: boolean = false, action: ActionLoginTypes) => {
	switch (action.type) {
		case ActionTypes.ActionLoginTypes:
			return action.payload;
		default:
			return state;
	}
};




