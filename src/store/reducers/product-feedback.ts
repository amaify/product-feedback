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

type ProductFeedbackState = {
	allFeedbacks: ProductFeedbacksData[];
};

type ProductFeedbackAction = {
	type: string;
	data: ProductFeedbacksData[];
};

const initialState: ProductFeedbackState = {
	allFeedbacks: [],
};

export const productFeedbacks = (
	state: ProductFeedbackState = initialState,
	action: ProductFeedbackAction
) => {
	switch (action.type) {
		case actionTypes.GET_PRODUCT_FEEDBACK:
			return {
				...state,
				allFeedbacks: action.data,
			};

		default:
			return state;
	}
};
