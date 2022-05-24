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

export const getProductComments = (productComments: ProductFeedbacksData[]) => {
	return {
		type: actionTypes.GET_PRODUCT_COMMENTS,
		data: productComments,
	};
};

export const getCommentReplies = (commentReplies: CommentReplies[]) => {
	return {
		type: actionTypes.GET_COMMENT_REPLIES,
		data: commentReplies,
	};
};
