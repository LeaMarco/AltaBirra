import { combineReducers } from 'redux';
import { Post } from '../actions/index';
import { postsOrderReducer, postsSearchReducer } from './posts';

// export interface StoreState {
// 	searchedPosts: Post[];
// }

export const rootReducer = combineReducers({
	searchedPosts: postsSearchReducer,
	orderPostsBy: postsOrderReducer
});

export type RootState = ReturnType<typeof rootReducer>;