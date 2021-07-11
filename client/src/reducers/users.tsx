import {User} from '../actions';
import {ActionTypes, PostAction,ActionAll, UserAction} from '../actions/index';



export const usersReducer = (state: User[] = [], action: UserAction) => {

	switch (action.type) {
		case ActionTypes.fetchUsers:
			return action.payload;
		default:
			return state;
	}
};
//SACAR ESTO DE USERS CREAR ARCHIVO POST
export const postReducer = (state: User[] = [], action: PostAction) => {
	switch (action.type) {
		case ActionTypes.createPost:
				return action.payload;
			//Mostrarle esto al user
		default:
			return state;
	}
};

//SACAR ESTO DE USERS CREAR ARCHIVO POST
export const editReducer = (state: User[] = [], action: ActionAll) => {
	switch (action.type) {
		case ActionTypes.createPost:
				return action.payload;
			//Mostrarle esto al user
		case ActionTypes.editPost:
				return action.payload;
			//Mostrarle esto al user
		default:
			return state;
	}
};
