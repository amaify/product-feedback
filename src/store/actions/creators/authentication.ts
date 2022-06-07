import * as actionTypes from "../actionTypes";

interface LoginData {
	token: string;
	name: string;
}

export const registerUser = () => {
	return {
		type: actionTypes.REGISTER_NEW_USER,
	};
};

export const loginUser = (userData: LoginData) => {
	return {
		type: actionTypes.LOGIN_USER,
		data: userData,
	};
};

export const logoutUser = () => {
	return {
		type: actionTypes.LOGOUT_USER,
	};
};

export const authLoading = () => {
	return {
		type: actionTypes.AUTH_LOADING,
	};
};
