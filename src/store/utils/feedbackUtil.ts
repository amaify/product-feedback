import {
	getProductFeedback,
	getOneProductFeedback,
	feedbackLoading,
	deleteFeedback,
	getFeedbackError,
	cancelDelete,
	resetFeedbackState,
	editSuccessful,
} from "../actions/creators/product-feedback";

const {
	REACT_APP_GET_ALL_FEEDBACK,
	REACT_APP_GET_ONE_FEEDBACK,
	REACT_APP_NEW_FEEDBACK,
	REACT_APP_EDIT_FEEDBACK,
	REACT_APP_DELETE_FEEDBACK,
} = process.env;

export const getFeedbacks = () => {
	return (dispatch: any) => {
		dispatch(feedbackLoading());
		fetch(REACT_APP_GET_ALL_FEEDBACK, {
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
		fetch(`${REACT_APP_GET_ONE_FEEDBACK}/${productId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				dispatch(getOneProductFeedback(responseData.data));
			})
			.catch((error) => dispatch(getFeedbackError(error.message)));
	};
};

export const addNewProductFeedback = (
	userData: any,
	navigate: any,
	token: string
) => {
	return (dispatch: any) => {
		dispatch(feedbackLoading());
		fetch(REACT_APP_NEW_FEEDBACK, {
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
					return;
				}
				dispatch(getFeedbackError(responseData.message));
				setTimeout(() => {
					dispatch(resetFeedbackState());
				}, 30000);
			})
			.catch((error) => {
				dispatch(getFeedbackError(error.message));
				setTimeout(() => {
					dispatch(resetFeedbackState());
				}, 30000);
			});
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
		fetch(`${REACT_APP_EDIT_FEEDBACK}/${productId}`, {
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
					dispatch(getFeedbacks());
					dispatch(editSuccessful());
					navigate("/");
					setTimeout(() => {
						dispatch(resetFeedbackState());
					}, 6000);
					return;
				}
				dispatch(getFeedbackError(responseData.message));
				setTimeout(() => {
					dispatch(resetFeedbackState());
				}, 30000);
			})
			.catch((error) => {
				dispatch(getFeedbackError(error.message));
				setTimeout(() => {
					dispatch(resetFeedbackState());
				}, 30000);
			});
	};
};

export const deleteProductFeedback = (
	productId: string,
	token: string,
	navigate: any
) => {
	return (dispatch: any) => {
		dispatch(feedbackLoading());
		fetch(`${REACT_APP_DELETE_FEEDBACK}/${productId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 201) {
					dispatch(deleteFeedback());
					navigate("/");
					return;
				}
				dispatch(getFeedbackError(responseData.message));
				dispatch(cancelDelete());
				setTimeout(() => {
					dispatch(resetFeedbackState());
				}, 30000);
			})
			.catch((error) => {
				dispatch(getFeedbackError(error.message));
				dispatch(cancelDelete());
				setTimeout(() => {
					dispatch(resetFeedbackState());
				}, 30000);
			});
	};
};
