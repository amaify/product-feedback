import React from "react";
import { useSelector } from "react-redux";
import EmptyFeedback from "./emptyFeedback/emptyFeedback";
import Feedback from "./feedback-tiles/feedback";

interface Feedbacks {
	allFeedbacks: {}[];
}

function FeedBackContainer() {
	const feedbacks = useSelector((state: Feedbacks) => state.allFeedbacks);

	return <>{feedbacks.length > 0 ? <Feedback /> : <EmptyFeedback />}</>;
}

export default FeedBackContainer;
