import {combineReducers} from 'redux';
import {usersReducer, asd, usersPremium} from './users';
import {User, UserPremium} from '../actions/index';


// FACU: Se agrego "usersPremium" como tercer reducer

export interface StoreState {
	users: User[];
	users2: User[];
	usersPremium: UserPremium[];
}

export const reducers = combineReducers<StoreState>({
	users: usersReducer,
	users2: asd,
	usersPremium: usersPremium
});