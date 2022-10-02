import { useSelector } from "react-redux";
import { RootState } from "../../type";

export const FeedbackUtility = () => {
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

	return {
		allFeedbacks,
		feedbackLoading,
		error,
		errMessage,
	};
};
