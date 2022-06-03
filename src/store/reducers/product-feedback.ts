import { CommentReplies, FeedbackProps } from "../../type";
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

// interface CommentData {
// 	_id: string;
// 	id: number;
// 	content: string;
// 	replies: [];
// 	creator: string;
// 	productFeedback: string;
// }

type ProductFeedbackState = {
	allFeedbacks: FeedbackProps[];
	plannedRoadmap: FeedbackProps[];
	inProgressRoadmap: FeedbackProps[];
	liveRoadmap: FeedbackProps[];
	oneFeedback: FeedbackProps[];
	feedbackLoading: boolean;
	sortText: string;
	edit: boolean;
	editContent: FeedbackProps[];
	getFeedbackToDelete: boolean;
	sortFeature: string;
};

type ProductFeedbackAction = {
	type: string;
	data: any;
};

const initialState: ProductFeedbackState = {
	allFeedbacks: [],
	oneFeedback: [],
	plannedRoadmap: [],
	inProgressRoadmap: [],
	liveRoadmap: [],
	feedbackLoading: false,
	edit: false,
	editContent: [],
	sortText: "Most Upvotes",
	sortFeature: "All",
	getFeedbackToDelete: false,
};

export const productFeedbackReducer = (
	state: ProductFeedbackState = initialState,
	action: ProductFeedbackAction
) => {
	switch (action.type) {
		case actionTypes.GET_PRODUCT_FEEDBACK:
			const allProductFeedback = action.data;
			let filteredProductFeedback = [...allProductFeedback];
			let plannedFeedback = filteredProductFeedback.filter(
				(prodFeed) => prodFeed.status.toLowerCase() === "planned"
			);
			let inProgressFeedback = filteredProductFeedback.filter(
				(prodFeed) => prodFeed.status === "In-Progress"
			);
			let liveFeedback = filteredProductFeedback.filter(
				(prodFeed) => prodFeed.status.toLowerCase() === "live"
			);

			return {
				...state,
				allFeedbacks: action.data,
				plannedRoadmap: plannedFeedback,
				inProgressRoadmap: inProgressFeedback,
				liveRoadmap: liveFeedback,
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

		case actionTypes.FILTER_BY_FEATURES:
			return {
				...state,
				sortFeature: action.data,
			};

		case actionTypes.SET_EDIT_TO_TRUE:
			return {
				...state,
				edit: true,
				editContent: action.data,
			};

		case actionTypes.GET_FEEDBACK_TO_DELETE:
			return {
				...state,
				getFeedbackToDelete: true,
			};

		case actionTypes.CANCEL_DELETE:
			return {
				...state,
				getFeedbackToDelete: false,
			};

		case actionTypes.DELETE_FEEDBACK:
			return {
				...state,
				getFeedbackToDelete: false,
			};

		default:
			return state;
	}
};
