import {
	getProductFeedback,
	getOneProductFeedback,
} from "../actions/creators/product-feedback";

import {
	getProductComments,
	getCommentReplies,
} from "../actions/creators/comments";

export const getComments = (productId: string) => {
	return (dispatch: any) => {
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
	};
};

export const getReplies = () => {
	return (dispatch: any) => {
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

export const addComment = (
	productFeedbackId: string,
	userToken: string,
	inputValue: { content: string }
) => {
	return (dispatch: any) => {
		fetch(`http://localhost:8080/feedback/new-comment/${productFeedbackId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userToken}`,
			},
			body: JSON.stringify(inputValue),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 201) {
					console.log(responseData);
					dispatch(getComments(productFeedbackId));
				}
			})
			.catch((error) => console.log(error.message));
	};
};

export const replyToComment = (
	commentId: string,
	userToken: string,
	inputValue: { content: string }
) => {
	return (dispatch: any) => {
		fetch(`http://localhost:8080/feedback/replies/${commentId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userToken}`,
			},
			body: JSON.stringify(inputValue),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 201) {
					console.log(responseData);
					dispatch(getReplies());
				}
			})
			.catch((error) => console.log(error));
	};
};

export const replyToReply = (
	replyId: string,
	userToken: string,
	inputValue: { content: string }
) => {
	return (dispatch: any) => {
		fetch(`http://localhost:8080/feedback/reply-reply/${replyId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userToken}`,
			},
			body: JSON.stringify(inputValue),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 201) {
					console.log(responseData);
					dispatch(getReplies());
				}
			})
			.catch((error) => console.log(error));
	};
};
