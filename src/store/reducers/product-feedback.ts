import { ProductFeedbackReducer } from "../../type";
import * as actionTypes from "../actions/actionTypes";
import { retrieveStoredData } from "../utils/authentication";

const storedData = retrieveStoredData();

let editFeedback;

if (storedData?.editFeedback) {
	editFeedback = storedData.editFeedback;
}

type ProductFeedbackAction = {
	type: string;
	data: any;
};

const initialState: ProductFeedbackReducer = {
	allFeedbacks: [],
	oneFeedback: undefined,
	plannedRoadmap: [],
	inProgressRoadmap: [],
	liveRoadmap: [],
	feedbackLoading: false,
	edit: false || editFeedback === "false" ? false : true,
	editContent: [],
	sortText: "Most Upvotes",
	sortFeature: "All",
	getFeedbackToDelete: false,
	upvoteError: false,
	upvoteErrorMessage: "",
	error: false,
	errorMessage: "",
	editSuccessful: false,
};

export const productFeedbackReducer = (
	state: ProductFeedbackReducer = initialState,
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
				feedbackLoading: false,
				edit: false,
				error: false,
				errorMessage: "",
			};

		case actionTypes.UPDATE_UPVOTE:
			const allFeedbacks = state.allFeedbacks;
			const productId = action.data;

			const xxx = allFeedbacks.filter((feedback) => feedback._id === productId);
			xxx[0].upvotes += 1;
			return {
				...state,
			};

		case actionTypes.UPVOTE_ERROR:
			return {
				...state,
				upvoteError: true,
				upvoteErrorMessage: action.data,
			};

		case actionTypes.GET_ONE_PRODUCT_FEEDBACK:
			return {
				...state,
				oneFeedback: action.data,
				feedbackLoading: false,
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
			localStorage.setItem("editFeedback", "true");
			return {
				...state,
				edit: true,
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
				feedbackLoading: false,
			};

		case actionTypes.FEEFBACK_LOADING:
			return {
				...state,
				feedbackLoading: true,
				error: false,
				errorMessage: "",
			};

		case actionTypes.RESET_FEEDBACK_STATE:
			return {
				...state,
				upvoteError: false,
				error: false,
				errorMessage: "",
				editSuccessful: false,
			};

		case actionTypes.GET_FEEDBACK_ERROR:
			return {
				...state,
				error: true,
				feedbackLoading: false,
				errorMessage: action.data,
			};

		case actionTypes.EDIT_SUCCESSFUL:
			return {
				...state,
				editSuccessful: true,
			};

		default:
			return state;
	}
};
