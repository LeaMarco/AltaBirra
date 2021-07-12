import {combineReducers} from 'redux';
import {detailReducer} from './detail';


export const rootReducer = combineReducers({
    detailPosts: detailReducer
});

export type RootState = ReturnType<typeof rootReducer>;
