import {
	getProductComments,
	getCommentReplies,
	addCommentLoading,
	resetCommentState,
	commentError,
} from "../actions/creators/comments";

const {
	REACT_APP_GET_COMMENTS,
	REACT_APP_GET_REPLIES,
	REACT_APP_ADD_COMMENT,
	REACT_APP_REPLY_TO_COMMENT,
	REACT_APP_REPLY_TO_REPLY,
} = process.env;

export const getComments = (productId: string) => {
	return (dispatch: any) => {
		fetch(`${REACT_APP_GET_COMMENTS}/${productId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				dispatch(getProductComments(responseData.data));
			})
			.catch((error) => {
				dispatch(commentError(error.message));
				setTimeout(() => {
					dispatch(resetCommentState());
				}, 10000);
			});
	};
};

export const getReplies = (commentId: string | undefined) => {
	return (dispatch: any) => {
		fetch(`${REACT_APP_GET_REPLIES}/${commentId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 400) {
					dispatch(commentError(responseData.message));
					setTimeout(() => {
						dispatch(resetCommentState());
					}, 10000);
					return "";
				}
				dispatch(getCommentReplies(responseData.data));
			})
			.catch((error) => dispatch(commentError(error.message)));
	};
};

export const addComment = (
	productFeedbackId: string | undefined,
	userToken: string,
	inputValue: { content: string }
) => {
	return (dispatch: any) => {
		dispatch(addCommentLoading());
		fetch(`${REACT_APP_ADD_COMMENT}/${productFeedbackId}`, {
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
					dispatch(getComments(productFeedbackId ? productFeedbackId : ""));
					return;
				}
				dispatch(commentError(responseData.message));
				setTimeout(() => {
					dispatch(resetCommentState());
				}, 10000);
			})
			.catch((error) => dispatch(commentError(error.message)));
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
		fetch(`${REACT_APP_REPLY_TO_COMMENT}/${prodId}/${commentId}`, {
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
					dispatch(getReplies(prodId));
				}
				dispatch(commentError(responseData.message));
				setTimeout(() => {
					dispatch(resetCommentState());
				}, 10000);
			})
			.catch((error) => dispatch(commentError(error.message)));
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
		fetch(`${REACT_APP_REPLY_TO_REPLY}/${commentId}/${replyId}`, {
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
					dispatch(getReplies(commentId));
				}
				dispatch(commentError(responseData.message));
				setTimeout(() => {
					dispatch(resetCommentState());
				}, 10000);
			})
			.catch((error) => dispatch(commentError(error.message)));
	};
};
