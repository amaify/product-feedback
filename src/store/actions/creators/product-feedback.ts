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

export const getProductFeedback = (
	productFeedbacks: ProductFeedbacksData[]
) => {
	return {
		type: actionTypes.GET_PRODUCT_FEEDBACK,
		data: productFeedbacks,
	};
};
