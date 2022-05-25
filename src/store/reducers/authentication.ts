import * as actionTypes from "../actions/actionTypes";
import { retrieveStoredData } from "../utils/authentication";

const storedData = retrieveStoredData();

let initialToken: any;
let userName: any;

if (storedData) {
	initialToken = storedData.token;
	userName = storedData.name;
}

type AuthenticationState = {
	token: string | null;
	name: string | null;
	isAuth: boolean;
};

type ProductFeedbackAction = {
	type: string;
	data: any;
};

const initialState: AuthenticationState = {
	token: initialToken,
	isAuth: !!initialToken || false,
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
