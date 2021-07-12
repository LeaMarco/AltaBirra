import axios from 'axios';
import { Dispatch } from 'redux';
//traermne mis actionsTypes

export interface Beer {
	name: string;
	ibu: number;
	abv: number;
	calories: number;
	dryHop: boolean;
	og: number;
	volume: number;
}

export interface Countable {
	discount: number;
	price: number;
	expireDate: Date;
}

export interface Post {
	id: number;
	title: string;
	description: string;
	image: string;
	stock: number;
	rating: number;
	shipping: boolean;
	visibility: boolean;
	username: string;
	beer: Beer;
	countable: Countable;
}
export enum ActionTypes {
	fetchUsers,
	deleteUser,
	createPost,
	editPost
}

export interface PostValues {
	beer: {
	  name: string;
	  abv: number;
	  og: number;
	  ibu: number;
	  calories: number;
	  dryHop: boolean;
	  volume: number;
	  genericType: string;
	  specificType: string;
	};
	infoPost: {
	  title: string;
	  description: string;
	  image: string;
	  stock: number;
	  rating: number;
	  shipping: boolean;
	  visibility: boolean;
	  username: string;
	};
	countable: {
	  price: number;
	  discount: number;
	};
  };

  export interface EditValues {
	beer: {
	  name: string;
	  abv: number;
	  og: number;
	  ibu: number;
	  calories: number;
	  dryHop: boolean;
	  volume: number;
	  genericType: string;
	  specificType: string;
	};
	infoPost: {
	  title: string;
	  description: string;
	  image: string;
	  stock: number;
	  rating: number;
	  shipping: boolean;
	  visibility: boolean;
	  username: string;
	};
	countable: {
	  price: number;
	  discount: number;
	};
	postId:number;
  };


// export interface FetchUsersAction {
// 	type: ActionTypes.fetchUsers;
// 	payload: User[];
// }

export interface SearchedPostAction {
	type: string;
	payload: Post[];
}

export interface OrderPostsByAction {
	type: string;
	payload: string;
}

const URL = 'http://localhost:3001';

export function searchedPosts(query) {
	return async function (dispatch: Dispatch) {
		const response = await axios.get<Post[]>(`${URL}/post`, { params: query })
		dispatch<SearchedPostAction>({
			type: "GET_SEARCHED_POST",
			payload: response.data
		});
	}
}

export function orderPostsBy<OrderPostsByAction>(orderBy) {
	return {
		type: "SET_ORDER_POSTS_BY",
		payload: orderBy
	}
}

export type Action = SearchedPostAction | OrderPostsByAction;

export interface CreatePostAction {
	type: ActionTypes.createPost;
	payload: PostValues;
}

export interface EditPostAction {
	type: ActionTypes.editPost;
	payload: EditValues;
}

export interface Actionrara {
	type: any;
	payload: any;
}



const url = 'http://localhost:3001/beers';
const urlpost = 'http://localhost:3001/post';
const urledit = 'http://localhost:3001/edit';



// export const fetchUsers = () => {
// 	return async (dispatch: Dispatch) => {
// 		const response = await axios.get<User[]>(url);
// 		dispatch<FetchUsersAction>({
// 			type: ActionTypes.fetchUsers,
// 			payload: response.data,
// 		});
// 	};
// };


export const createPost = (data) => {
	return async (dispatch: Dispatch) => {
		const response = await axios.post<PostValues>(urlpost,{params:data});
		console.log(ActionTypes)
		dispatch<Actionrara>({
			type: ActionTypes.createPost,
			payload: response.data,
		});
	};
};


export const editPost = (data) => {
	console.log(data,"data create post action")
	return async (dispatch: Dispatch) => {
		const response = await axios.put<EditValues>(urledit,{params:data});
		dispatch<Actionrara>({
			type: ActionTypes.editPost,
			payload: response.data,
		});
	};
};

export type PostAction = CreatePostAction;
// export type UserAction = FetchUsersAction;
export type ActionAll = Actionrara;


