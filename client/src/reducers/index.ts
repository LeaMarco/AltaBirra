import { combineReducers } from 'redux';
import { Post } from '../actions/index';
import { postsFavoritesReducer, postsSearchQueryReducer, postsSearchReducer } from './posts';
import { usersPremium } from './users';
import { UserPremium } from '../actions/index';
import { detailReducer } from './detail';
import { cartReducer } from './cart';
import { cart } from '../actions/index';

export interface StoreState {

	usersPremium: UserPremium[];
	cart: cart[];
}

export const rootReducer = combineReducers({
	searchedPosts: postsSearchReducer,
	postsSearchQuery: postsSearchQueryReducer,
	usersPremium: usersPremium,
	detailPosts: detailReducer,
	cart: cartReducer,
	favoritePosts: postsFavoritesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

