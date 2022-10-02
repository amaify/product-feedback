import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFeedbacks } from "../../store/utils/feedbackUtil";
import EmptyFeedback from "./emptyFeedback/emptyFeedback";
import Feedback from "./feedback-tiles/feedback";
import { Loader } from "../loading/loading";
import { FeedbackUtility } from "./util";

function FeedBackContainer() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getFeedbacks());
	}, [dispatch]);

	const { allFeedbacks, errMessage, error, feedbackLoading } =
		FeedbackUtility();

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
