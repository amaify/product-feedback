import { CommentReplies } from "../../type";
import * as actionTypes from "../actions/actionTypes";

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

interface CommentData {
	_id: string;
	id: number;
	content: string;
	replies: [];
	creator: string;
	productFeedback: string;
}

type ProductFeedbackState = {
	allFeedbacks: ProductFeedbacksData[];
	oneFeedback: ProductFeedbacksData[];
	feedbackComments: CommentData[];
	commentReplies: CommentReplies[];
};

type ProductFeedbackAction = {
	type: string;
	data: any;
};

const initialState: ProductFeedbackState = {
	allFeedbacks: [],
	oneFeedback: [],
	feedbackComments: [],
	commentReplies: [],
};

export const productFeedbackReducer = (
	state: ProductFeedbackState = initialState,
	action: ProductFeedbackAction
) => {
	switch (action.type) {
		case actionTypes.GET_PRODUCT_FEEDBACK:
			return {
				...state,
				allFeedbacks: action.data,
			};

		case actionTypes.GET_ONE_PRODUCT_FEEDBACK:
			return {
				...state,
				oneFeedback: action.data,
			};

		case actionTypes.GET_PRODUCT_COMMENTS:
			return {
				...state,
				feedbackComments: action.data,
			};

		case actionTypes.GET_COMMENT_REPLIES:
			return {
				...state,
				commentReplies: action.data,
			};

		default:
			return state;
	}
};
