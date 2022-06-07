import { json } from "stream/consumers";
import {
	authLoading,
	loginUser,
	logoutUser,
	registerUser,
} from "../actions/creators/authentication";

interface UserData {
	name?: string;
	userName?: string;
	email?: string;
	password?: string;
}

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
		duration: remainingTime,
	};
};

export const RegisterNewuser = (userData: UserData, navigate: any) => {
	return (dispatch: any) => {
		fetch("http://localhost:8080/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 201) {
					navigate("/login");
					console.log(responseData);
				}
			})
			.catch((error) => console.log(error.message));
	};
};

export const LoginUser = (userData: UserData, navigate: any) => {
	return (dispatch: any) => {
		dispatch(authLoading());
		fetch("http://localhost:8080/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 200) {
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

					console.log(responseData);
				}
			})
			.catch((error) => console.log(error.message));
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
