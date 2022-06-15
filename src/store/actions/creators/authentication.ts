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

export const forgotPassword = (message: string) => {
	return {
		type: actionTypes.FORGOT_PASSWORD,
		data: message,
	};
};

export const authLoading = () => {
	return {
		type: actionTypes.AUTH_LOADING,
	};
};

export const authError = (error: string) => {
	return {
		type: actionTypes.AUTH_ERROR,
		data: error,
	};
};

export const removeAuthError = () => {
	return {
		type: actionTypes.REMOVE_AUTH_ERROR,
	};
};

export const registrationSuccess = () => {
	return {
		type: actionTypes.REGISTRATION_SUCCESS,
	};
};
