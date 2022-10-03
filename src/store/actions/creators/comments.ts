import { CommentReplies } from "../../../type";
import * as actionTypes from "../actionTypes";

interface ProductFeedbacksData {
	_id: string;
	id: number;
	title: string;
	category: string;
	upvotes: number;
	status: string;
	description: string;
	comments: string[];
	creator: string;
}

interface ReturnType {
	type: string;
	data?: any;
}

export const getProductComments = (
	productComments: ProductFeedbacksData[]
): ReturnType => {
	return {
		type: actionTypes.GET_PRODUCT_COMMENTS,
		data: productComments,
	};
};

export const getCommentReplies = (
	commentReplies: CommentReplies[]
): ReturnType => {
	return {
		type: actionTypes.GET_COMMENT_REPLIES,
		data: commentReplies,
	};
};

export const addCommentLoading = (): ReturnType => {
	return {
		type: actionTypes.ADD_COMMENT_LOADING,
	};
};

export const commentError = (errMessage: string): ReturnType => {
	return {
		type: actionTypes.COMMENT_ERROR,
		data: errMessage,
	};
};

export const resetCommentState = (): ReturnType => {
	return {
		type: actionTypes.RESET_COMMENT_STATE,
	};
};
