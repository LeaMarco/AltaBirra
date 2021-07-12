import { combineReducers } from 'redux';
import { Post } from '../actions/index';
import { postsOrderReducer, postsSearchReducer } from './posts';
import {usersReducer} from './users';

export const rootReducer = combineReducers({
	searchedPosts: postsSearchReducer,
	orderPostsBy: postsOrderReducer
});

export type RootState = ReturnType<typeof rootReducer>;
