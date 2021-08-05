import { combineReducers } from 'redux';
import { Post } from '../actions/index';
import { getHistoryReducer, postsFavoritesReducer, postsSearchQueryReducer, postsSearchReducer, sellingPostsReducer } from './posts';
import { usersPremium, userData, login } from './users';
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
	favoritePosts: postsFavoritesReducer,
	history: getHistoryReducer,
	welcome: userData,
	loginState: login,
	sellingPosts: sellingPostsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

