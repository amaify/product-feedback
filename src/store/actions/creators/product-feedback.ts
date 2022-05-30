import { CommentReplies, FeedbackProps } from "../../../type";
import * as actionTypes from "../actionTypes";

// interface ProductFeedbacksData {
// 	_id: string;
// 	id: number;
// 	title: string;
// 	category: string;
// 	upvotes: number;
// 	status: string;
// 	description: string;
// 	comments: string[];
// 	creator: string;
// }

export const getProductFeedback = (productFeedbacks: FeedbackProps[]) => {
	return {
		type: actionTypes.GET_PRODUCT_FEEDBACK,
		data: productFeedbacks,
	};
};

export const getOneProductFeedback = (productFeedback: FeedbackProps) => {
	return {
		type: actionTypes.GET_ONE_PRODUCT_FEEDBACK,
		data: productFeedback,
	};
};

export const addNewFeedback = () => {
	return {
		type: actionTypes.ADD_NEW_FEEDBACK,
	};
};

export const sortFeedback = (sortText: string) => {
	return {
		type: actionTypes.SORT_FEEDBACK,
		data: sortText,
	};
};

export const incrementUpvote = () => {
	return {
		type: actionTypes.INCREASE_UPVOTE,
	};
};

export const setEditToTrue = (productContent: FeedbackProps) => {
	return {
		type: actionTypes.SET_EDIT_TO_TRUE,
		data: productContent,
	};
};
