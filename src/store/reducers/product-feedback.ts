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

// interface CommentData {
// 	_id: string;
// 	id: number;
// 	content: string;
// 	replies: [];
// 	creator: string;
// 	productFeedback: string;
// }

type ProductFeedbackState = {
	allFeedbacks: ProductFeedbacksData[];
	oneFeedback: ProductFeedbacksData[];
	feedbackLoading: boolean;
	sortText: string;
};

type ProductFeedbackAction = {
	type: string;
	data: any;
};

const initialState: ProductFeedbackState = {
	allFeedbacks: [],
	oneFeedback: [],
	feedbackLoading: false,
	sortText: "Most Upvotes",
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

		case actionTypes.ADD_NEW_FEEDBACK:
			return {
				...state,
				feedbackLoading: false,
			};

		case actionTypes.SORT_FEEDBACK:
			return {
				...state,
				sortText: action.data,
			};

		default:
			return state;
	}
};
