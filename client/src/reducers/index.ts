import { combineReducers } from 'redux';
import { Post } from '../actions/index';
import { postsSearchQueryReducer, postsSearchReducer } from './posts';
import { usersPremium } from './users';
import { UserPremium } from '../actions/index';
import { detailReducer } from './detail';

export interface StoreState {

	usersPremium: UserPremium[];
}

export const rootReducer = combineReducers({
	searchedPosts: postsSearchReducer,
	postsSearchQuery: postsSearchQueryReducer,
	usersPremium: usersPremium,
	detailPosts: detailReducer
});

export type RootState = ReturnType<typeof rootReducer>;

