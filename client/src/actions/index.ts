import axios from 'axios';
import { Dispatch } from 'redux';
// import { GET_BEERS } from './typesName';
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
	editPost,
	loadUserPremium,
	getDetail,
	getCart,
	delPostInCart,
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
	date: Date;
};

export interface EditValues { ///////CREO QUE NO SE USA
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
	postId: number;
};


export interface EditPostInterface {
	beer: {
		name: string;
		abv: string;
		og: string;
		ibu: string;
		calories: string;
		dryHop: string;
		volume: string;
		genericType: string;
		specificType: string;
	};
	infoPost: {
		title: string;
		description: string;
		image: string;
		stock: string;
		rating: string;
		shipping: string;
		visibility: string;
		username: string;
	};
	countable: {
		price: string;
		discount: string;
	};
	postId: string;
	date: string;
};


// export interface FetchUsersAction {
// 	type: ActionTypes.fetchUsers;
// 	payload: User[];
// }

export interface getPostsAction {
	type: string;
	payload: Post[];
}
export interface specificType {
	id: number,
	"type": "Amber",
	description: string,
	"group": "ALE",
	"genericTypeId": number
}

export interface genericType {
	id: number,
	"type": "Rubia",
	description: string
}

export interface beer {
	id: number,
	name: string,
	abv: number,
	og: number,
	ibu: number,
	calories: number,
	dryHop: false,
	volume: number,
	genericTypeId: number,
	specificTypeId: number
}

export interface countable {
	id: number,
	price: number,
	discount: number,
}


export interface post {
	id: number,
	title: string,
	description: string,
	image: string,
	stock: number,
	rating: number,
	shipping: false,
	visibility: true,
	beerId: number,
	userId: number,
	countableId: number
}

export interface QueryTypes {
	title?: string;
	genericType?: string;
	specificType?: string;
	rating?: number;
	minPrice?: number;
	maxPrice?: number;
	minIbu?: number;
	maxIbu?: number;
	minAbv?: number;
	maxAbv?: number;
	minOg?: number;
	maxOg?: number;
	minCalories?: number;
	maxCalories?: number;
	hasDryHop?: boolean;
	hasShipping?: boolean;
	hasDiscount?: boolean;
	orderBy?: string;
}

export interface SetQuerySearchAction {
	type: string;
	payload: QueryTypes;
}

const URL = 'http://localhost:3001';

export function searchedPosts(query) {
	return async function (dispatch: Dispatch) {
		const response = await axios.get<Post[]>(`${URL}/post`, { params: query })
		dispatch<getPostsAction>({
			type: "GET_SEARCHED_POST",
			payload: response.data
		});
	}
}

export interface getDetailAction {
	type: ActionTypes.getDetail;
	payload: post;
}

export function setTitleSearch<SetQuerySearchAction>(title: string) {
	return {
		type: "SET_TITLE_SEARCH",
		payload: title
	}
}

export function setQuerySearch<SetQuerySearchAction>(query: QueryTypes) {
	return {
		type: "SET_QUERY_SEARCH",
		payload: query
	}
}

export type Action = SetQuerySearchAction | getDetailAction | getCartAction | delPostInCartAction | getPostsAction | SetQuerySearchAction | getDetailAction;

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
const urlspecific = 'http://localhost:3001/specificTypes';
const urlgeneric = 'http://localhost:3001/genericTypes';


export const searchTypes = () => {
	return async (dispatch: Dispatch) => {
		const genericTypes = await axios.get<Array<string>>(urlgeneric);
		const specificTypes = await axios.get<Array<string>>(urlspecific);
		return [genericTypes.data, specificTypes.data]
	};
};

export const createPost = (data) => {
	return async (dispatch: Dispatch) => {
		const response = await axios.post<PostValues>(urlpost, { params: data });
		return response;
		// dispatch<Actionrara>({
		// 	type: ActionTypes.createPost,
		// 	payload: response.data,
		// });
		//Hace falta dispatchear algo aca?, no creo rey
	};
};


export const editPost = (data) => {
	return async (dispatch: Dispatch) => {
		const response = await axios.put<EditValues>(urledit, { params: data });
		return response;
	};
}

export type PostAction = CreatePostAction;
// export type UserAction = FetchUsersAction;
export type ActionAll = Actionrara;

// FACU: function "loadUsersPremium" e interface UserPremium

export interface UserPremium {
	id: number;
	username: string;
	email: string;
	name: string;
	password: string;
	premium: boolean;
	roleId: number;
	cartId: number
}

export interface UsersPremiumAction {
	type: ActionTypes.loadUserPremium;
	payload: UserPremium[];
}

export const loadUsersPremium = () => {
	return (dispatch: Dispatch) => {
		return axios.get<UserPremium[]>('http://localhost:3001/beer/premium')
			.then(response => {
				dispatch<UsersPremiumAction>({
					type: ActionTypes.loadUserPremium,
					payload: response.data,
				});
			})
			.catch(error => console.error('No se pudieron obtener las cervezas premium'))
	}
}

// export type Action = FetchUsersAction;
export type ActionUsersPremium = UsersPremiumAction;


// const urlDetail = 'http://localhost:3001/detailBeer'
const urlDetail = 'https://altabirra.herokuapp.com/detailBeer'

export const getDetail = (id) => {
	return async (dispatch: Dispatch) => {
		const response = await axios.get<post>(`${urlDetail}/${id}`)
		dispatch<getDetailAction>({
			type: ActionTypes.getDetail,
			payload: response.data,
		})
	}
}

export interface cart {
	posts: post;
	amount: number;
}

export interface getCartAction {
	type: ActionTypes.getCart;
	payload: cart[];
}
export interface delPostInCartAction {
	type: ActionTypes.delPostInCart;
	payload: cart[];
}

export const getCart = (id) => {
	return async (dispatch: Dispatch) => {
		const response = await axios.get<cart[]>(`http://localhost:3001/cart/${id}`)
		dispatch<getCartAction>({
			type: ActionTypes.getCart,
			payload: response.data,
		})
	}
}


const urladdtocart = 'http://localhost:3001/addToCart';

// export const addToCart = (data) => {
//     return async (dispatch: Dispatch) => {
//         const response = await axios.put<PostValues>(urladdtocart, { params: data });
//         return response;
//     };
// };

export function getFavoritePosts(username) {
	return async function (dispatch: Dispatch) {
		const response = await axios.get<Post[]>(`${URL}/getFavorites`, { params: { username } });
		dispatch<getPostsAction>({
			type: "GET_FAVORITE_POSTS",
			payload: response.data
		});
	}
}

export function getHistory(type, userId) {
	return async function (dispatch: Dispatch) {
		const response = await axios.get(`${URL}/${type}History`, { params: { userId } });
		dispatch({
			type: "GET_HISTORY",
			payload: response.data
		})
	}
}