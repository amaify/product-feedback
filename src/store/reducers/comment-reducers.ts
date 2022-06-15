import { CommentReplies } from "../../type";
import * as actionTypes from "../actions/actionTypes";

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

interface CommentData {
	_id: string;
	id: number;
	content: string;
	replies: [];
	creator: string;
	productFeedback: string;
}

type CommentState = {
	feedbackComments: CommentData[];
	commentReplies: CommentReplies[];
	addCommentLoading: boolean;
};

type ProductFeedbackAction = {
	type: string;
	data: any;
};

const initialState: CommentState = {
	feedbackComments: [],
	commentReplies: [],
	addCommentLoading: false,
};

export const commentReducer = (
	state: CommentState = initialState,
	action: ProductFeedbackAction
) => {
	switch (action.type) {
		case actionTypes.GET_PRODUCT_COMMENTS:
			return {
				...state,
				feedbackComments: action.data,
				addCommentLoading: false,
			};

		case actionTypes.GET_COMMENT_REPLIES:
			return {
				...state,
				commentReplies: action.data,
				addCommentLoading: false,
			};

		case actionTypes.ADD_COMMENT_LOADING:
			return {
				...state,
				addCommentLoading: true,
			};

		default:
			return state;
	}
};
