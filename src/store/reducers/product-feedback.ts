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
};

type ProductFeedbackAction = {
	type: string;
	data: any;
};

const initialState: ProductFeedbackState = {
	allFeedbacks: [],
	oneFeedback: [],
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

		default:
			return state;
	}
};
