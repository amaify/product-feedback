import { CommentReducer } from "../../type";
import * as actionTypes from "../actions/actionTypes";

type ProductFeedbackAction = {
	type: string;
	data: any;
};

const initialState: CommentReducer = {
	feedbackComments: [],
	commentReplies: [],
	addCommentLoading: false,
	commentError: false,
	commentErrMessage: "",
};

export const commentReducer = (
	state: CommentReducer = initialState,
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

		case actionTypes.COMMENT_ERROR:
			return {
				...state,
				commentError: true,
				addCommentLoading: false,
				commentErrMessage: action.data,
			};

		case actionTypes.RESET_COMMENT_STATE:
			return {
				...state,
				commentError: false,
				commentErrMessage: "",
			};

		default:
			return state;
	}
};
