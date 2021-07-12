import { combineReducers } from 'redux';
import { Post } from '../actions/index';
import { postsOrderReducer, postsSearchReducer } from './posts';
import { usersPremium} from './users';
import {UserPremium} from '../actions/index';

export interface StoreState {
	
	usersPremium: UserPremium[];
}

export const rootReducer = combineReducers({
	searchedPosts: postsSearchReducer,
	orderPostsBy: postsOrderReducer,
	usersPremium: usersPremium
});

export type RootState = ReturnType<typeof rootReducer>;



