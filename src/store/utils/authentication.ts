import {
	authError,
	authLoading,
	forgotPassword,
	loginUser,
	logoutUser,
	registerUser,
	registrationSuccess,
	removeAuthError,
} from "../actions/creators/authentication";

interface UserData {
	name?: string;
	userName?: string;
	email?: string;
	password?: string;
}

const {
	REACT_APP_REGISTER_USER,
	REACT_APP_LOGIN_USER,
	REACT_APP_FORGOT_PASSWORD,
} = process.env;

let logoutTimer: any;

const calculateRemainingTime = (expirationTime: string) => {
	const currentTime = new Date().getTime();
	const adjustedExpirationTime = new Date(expirationTime).getTime();

	const remainingDuration = adjustedExpirationTime - currentTime;

	return remainingDuration;
};

export const retrieveStoredData = () => {
	const storedToken = localStorage.getItem("token");
	const storedFullname = localStorage.getItem("name");
	const storedUserId = localStorage.getItem("userId");
	const storedExpirationTime = localStorage.getItem("expirationTime");
	const editFeedback = localStorage.getItem("editFeedback");

	let remainingTime: any;

	if (storedExpirationTime) {
		remainingTime = calculateRemainingTime(storedExpirationTime);
	}

	if (remainingTime <= 60000) {
		localStorage.removeItem("token");
		localStorage.removeItem("name");
		localStorage.removeItem("expirationTime");
		return null;
	}

	return {
		token: storedToken,
		name: storedFullname,
		userId: storedUserId,
		editFeedback: editFeedback,
		duration: remainingTime,
	};
};

export const RegisterNewuser = (userData: UserData, navigate: any) => {
	return (dispatch: any) => {
		dispatch(authLoading());
		fetch(REACT_APP_REGISTER_USER, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode !== 201) {
					dispatch(authError(responseData.message));
					setTimeout(() => {
						return dispatch(removeAuthError());
					}, 60000);
					return;
				}

				dispatch(registerUser());
				navigate("/login");

				setTimeout(() => dispatch(registrationSuccess()), 6000);
			})
			.catch((error) => dispatch(authError(error.message)));
	};
};

export const LoginUser = (userData: UserData, navigate: any) => {
	return (dispatch: any) => {
		dispatch(authLoading());
		fetch(REACT_APP_LOGIN_USER, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode !== 200) {
					dispatch(authError(responseData.message));
					setTimeout(() => {
						return dispatch(removeAuthError());
					}, 60000);
					return;
				}

				dispatch(loginUser(responseData));
				localStorage.setItem("token", responseData.token);
				localStorage.setItem("name", responseData.fullName);
				localStorage.setItem("userId", responseData.userId);
				navigate("/");

				const expirationTime = new Date(
					new Date().getTime() + +"3600" * 1000
				).toISOString();

				localStorage.setItem("expirationTime", expirationTime);

				const remainingTime = calculateRemainingTime(expirationTime);

				logoutTimer = setTimeout(() => {
					dispatch(logoutUser());
				}, remainingTime);
			})
			.catch((error) => dispatch(authError(error.message)));
	};
};

export const LogoutUser = () => {
	return (dispatch: any) => {
		dispatch(logoutUser());
		localStorage.removeItem("token");
		localStorage.removeItem("name");
		localStorage.removeItem("expirationTime");

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	};
};

export const forgotPasswordUtil = (userInput: { email: string }) => {
	return (dispatch: any) => {
		dispatch(authLoading());
		fetch(REACT_APP_FORGOT_PASSWORD, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userInput),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode !== 200) {
					dispatch(authError(responseData.message));
					setTimeout(() => {
						return dispatch(removeAuthError());
					}, 60000);
					return;
				}
				dispatch(forgotPassword(responseData.message));
				setTimeout(() => {
					return dispatch(removeAuthError());
				}, 10000);
			})
			.catch((error) => dispatch(authError(error.message)));
	};
};
