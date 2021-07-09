import {combineReducers} from 'redux';
import {usersReducer} from './users';
import {asd} from './users';
import {User} from '../actions/index';

export interface StoreState {
	users: User[];
	users2: User[];
}

export const reducers = combineReducers<StoreState>({
	users: usersReducer,
	users2: asd,
});