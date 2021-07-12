import { combineReducers } from 'redux';
import { Post } from '../actions/index';
import { postsOrderReducer, postsSearchReducer } from './posts';
import {usersReducer, asd, usersPremium} from './users';
import {User, UserPremium} from '../actions/index';

export interface StoreState {
	users: User[];
	users2: User[];
	usersPremium: UserPremium[];
}

export const rootReducer = combineReducers({
	searchedPosts: postsSearchReducer,
	orderPostsBy: postsOrderReducer,
	usersPremium: usersPremium
});

export type RootState = ReturnType<typeof rootReducer>;



