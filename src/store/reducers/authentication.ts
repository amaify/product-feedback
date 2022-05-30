import * as actionTypes from "../actions/actionTypes";
import { retrieveStoredData } from "../utils/authentication";

const storedData = retrieveStoredData();

let initialToken: any;
let userName: any;
let userId: any;

if (storedData) {
	initialToken = storedData.token;
	userName = storedData.name;
	userId = storedData.userId;
}

type AuthenticationState = {
	token: string | null;
	name: string | null;
	userId: string | null;
	isAuth: boolean;
};

type ProductFeedbackAction = {
	type: string;
	data: any;
};

const initialState: AuthenticationState = {
	token: initialToken,
	isAuth: !!initialToken || false,
	userId: userId || "",
	name: userName || "",
};

export const authenticationReducer = (
	state: AuthenticationState = initialState,
	action: ProductFeedbackAction
) => {
	switch (action.type) {
		case actionTypes.REGISTER_NEW_USER:
			return {
				...state,
				feedbackComments: action.data,
			};

		case actionTypes.LOGIN_USER:
			return {
				...state,
				token: action.data.token,
				name: action.data.fullName,
				userId: action.data.userId,
				isAuth: !!action.data.token,
			};

		case actionTypes.LOGOUT_USER:
			return {
				...state,
				token: null,
				name: "",
				isAuth: false,
			};

		default:
			return state;
	}
};
