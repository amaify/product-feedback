import {
	getProductFeedback,
	getOneProductFeedback,
} from "../actions/creators/product-feedback";

import {
	getProductComments,
	getCommentReplies,
} from "../actions/creators/comments";

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

export const upvoteIncrement = (productId: string, upvoteNumber: number) => {
	let data = {
		upvotes: upvoteNumber,
	};

	return (dispatch: any) => {
		fetch(`http://localhost:8080/feedback/upvoting/${productId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((responseData) => console.log(responseData.message))
			.catch((error) => console.log(error));
	};
};
