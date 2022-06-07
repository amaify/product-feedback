import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFeedbacks } from "../../store/utils/feedbackUtil";
import { RootState } from "../../type";
import EmptyFeedback from "./emptyFeedback/emptyFeedback";
import Feedback from "./feedback-tiles/feedback";

function FeedBackContainer() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getFeedbacks());
	}, []);

	const feedbacks = useSelector(
		(state: RootState) => state.productFeedbackReducer.allFeedbacks
	);

	return <>{feedbacks.length > 0 ? <Feedback /> : <EmptyFeedback />}</>;
}

export default FeedBackContainer;
