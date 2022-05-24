import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../type";
import EmptyFeedback from "./emptyFeedback/emptyFeedback";
import Feedback from "./feedback-tiles/feedback";

function FeedBackContainer() {
	const feedbacks = useSelector(
		(state: RootState) => state.productFeedbackReducer.allFeedbacks
	);

	return <>{feedbacks.length > 0 ? <Feedback /> : <EmptyFeedback />}</>;
}

export default FeedBackContainer;
