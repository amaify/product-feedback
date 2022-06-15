import {
	getProductFeedback,
	getOneProductFeedback,
} from "../actions/creators/product-feedback";

import {
	getProductComments,
	getCommentReplies,
	addCommentLoading,
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

export const getReplies = (commentId: string | undefined) => {
	return (dispatch: any) => {
		fetch(`http://localhost:8080/feedback/commentReply/${commentId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 400) {
					return "";
				}
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
		dispatch(addCommentLoading());
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
	inputValue: { content: string },
	prodId: string | undefined
) => {
	return (dispatch: any) => {
		dispatch(addCommentLoading());
		fetch(`http://localhost:8080/feedback/replies/${prodId}/${commentId}`, {
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
					dispatch(getReplies(prodId));
				}
			})
			.catch((error) => console.log(error));
	};
};

export const replyToReply = (
	replyId: string,
	userToken: string,
	inputValue: { content: string },
	commentId: string | undefined
) => {
	return (dispatch: any) => {
		dispatch(addCommentLoading());
		fetch(
			`http://localhost:8080/feedback/reply-reply/${commentId}/${replyId}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userToken}`,
				},
				body: JSON.stringify(inputValue),
			}
		)
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 201) {
					console.log(responseData);
					dispatch(getReplies(commentId));
				}
			})
			.catch((error) => console.log(error));
	};
};
