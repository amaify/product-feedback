import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFeedbacks } from "../../store/utils/feedbackUtil";
import { RootState } from "../../type";
import EmptyFeedback from "./emptyFeedback/emptyFeedback";
import Feedback from "./feedback-tiles/feedback";
import { Loader } from "../loading/loading";

function FeedBackContainer() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getFeedbacks());
	}, [dispatch]);

	const feedbackState = useSelector((state: RootState) => {
		return {
			allFeedbacks: state.productFeedbackReducer.allFeedbacks,
			feedbackLoading: state.productFeedbackReducer.feedbackLoading,
			error: state.productFeedbackReducer.error,
			errorMessage: state.productFeedbackReducer.errorMessage,
		};
	});

	const { allFeedbacks, feedbackLoading, error, errorMessage } = feedbackState;

	const errMessage = (
		<div className="feedback-container__error">
			<div className="feedback-container__error--content">
				<p className="feedback-container__error--message">{errorMessage}</p>
			</div>
		</div>
	);

	return (
		<div className="feedback-container">
			{feedbackLoading && <Loader />}

			{allFeedbacks.length > 0 ? (
				<Feedback />
			) : !error ? (
				<>{!feedbackLoading && <EmptyFeedback />}</>
			) : (
				errMessage
			)}
		</div>
	);
}

export default FeedBackContainer;
