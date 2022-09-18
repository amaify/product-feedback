import { CommentReplies, FeedbackProps } from "../../../type";
import * as actionTypes from "../actionTypes";

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

export const filterByFeatures = (filterFeature: string) => {
	return {
		type: actionTypes.FILTER_BY_FEATURES,
		data: filterFeature,
	};
};

export const upvoteError = (errorMessage: string) => {
	return {
		type: actionTypes.UPVOTE_ERROR,
		data: errorMessage,
	};
};

// export const incrementUpvote = (upvoteNumber: number) => {
// 	return {
// 		type: actionTypes.INCREASE_UPVOTE,
// 		data: upvoteNumber,
// 	};
// };

export const setEditToTrue = (productContent: FeedbackProps) => {
	return {
		type: actionTypes.SET_EDIT_TO_TRUE,
		data: productContent,
	};
};

export const getFeedbackToDelete = () => {
	return {
		type: actionTypes.GET_FEEDBACK_TO_DELETE,
	};
};

export const deleteFeedback = () => {
	return {
		type: actionTypes.DELETE_FEEDBACK,
	};
};

export const cancelDelete = () => {
	return {
		type: actionTypes.CANCEL_DELETE,
	};
};

export const feedbackLoading = () => {
	return {
		type: actionTypes.FEEFBACK_LOADING,
	};
};

export const resetFeedbackState = () => {
	return {
		type: actionTypes.RESET_FEEDBACK_STATE,
	};
};
