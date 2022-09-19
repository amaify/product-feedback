import {
	getProductFeedback,
	getOneProductFeedback,
	feedbackLoading,
	deleteFeedback,
	getFeedbackError,
} from "../actions/creators/product-feedback";

export const getFeedbacks = () => {
	return (dispatch: any) => {
		dispatch(feedbackLoading());
		fetch("http://localhost:8080/feedback/feedbacks", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((responseData) => {
				dispatch(getProductFeedback(responseData.data));
			})
			.catch((error) => {
				dispatch(getFeedbackError(error.message));
			});
	};
};

export const getOneFeedback = (productId: string) => {
	return (dispatch: any) => {
		dispatch(feedbackLoading());
		fetch(`http://localhost:8080/feedback/product-feedback/${productId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				dispatch(getOneProductFeedback(responseData.data));
			})
			.catch((error) => console.log(error));
	};
};

export const addNewProductFeedback = (
	userData: any,
	navigate: any,
	token: string
) => {
	return (dispatch: any) => {
		dispatch(feedbackLoading());
		fetch("http://localhost:8080/feedback/new-feedback", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(userData),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 201) {
					navigate("/");
					dispatch(getFeedbacks());
				}
			})
			.catch((error) => console.log(error));
	};
};

export const editProductFeedback = (
	userData: any,
	navigate: any,
	token: string,
	productId: string
) => {
	return (dispatch: any) => {
		dispatch(feedbackLoading());
		fetch(`http://localhost:8080/feedback/edit-feedback/${productId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(userData),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 201) {
					navigate("/");
					dispatch(getFeedbacks());
				}
			})
			.catch((error) => console.log(error));
	};
};

export const deleteProductFeedback = (
	productId: string,
	token: string,
	navigate: any
) => {
	return (dispatch: any) => {
		fetch(`http://localhost:8080/feedback/delete-feedback/${productId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 201) {
					console.log(responseData.message);
					dispatch(deleteFeedback());
					navigate("/");
				}
			})
			.catch((error) => console.log(error));
	};
};
