import {
	getProductFeedback,
	getOneProductFeedback,
	getProductComments,
	getCommentReplies,
} from "../actions/creators/product-feedback";

export const getFeedbacks = () => {
	return (dispatch: any) => {
		fetch("http://localhost:8080/feedback/feedbacks", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((responseData) => {
				dispatch(getProductFeedback(responseData.data));
			})
			.catch((error) => console.log(error));
	};
};

export const getOneFeedback = (productId: string) => {
	return (dispatch: any) => {
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

		fetch(`http://localhost:8080/feedback/comments/${productId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				dispatch(getProductComments(responseData.data));
			})
			.catch((error) => console.log(error));

		fetch("http://localhost:8080/feedback/commentReply", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				dispatch(getCommentReplies(responseData.data));
			})
			.catch((error) => console.log(error));
	};
};
