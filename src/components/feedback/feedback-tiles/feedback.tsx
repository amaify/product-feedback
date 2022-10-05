import { connect } from "react-redux";
import { FeedbackProps, RootState } from "../../../type";
import { FlashMessage } from "../../../utils/flash-message";
import FeedbackTilesDesktop from "./components/DesktopFeedbackTiles";
import FeedbackTilesMobile from "./components/MobileFeedbackTiles";

interface StateProps {
	prodFeedbacks: FeedbackProps[];
	sortText: string;
	sortCategory: string;
	upvoteError: boolean;
	upvoteErrorMessage: string;
	editSuccessful: boolean;
}

function Feedback(props: StateProps) {
	let sortedFeedbacks = [...props.prodFeedbacks];
	const { sortCategory } = props;

	let renderedFeedbacks;

	switch (props.sortText) {
		case "Most Upvotes":
			renderedFeedbacks = sortedFeedbacks.sort(
				(a: any, b: any) => b.upvotes - a.upvotes
			);
			break;

		case "Least Upvotes":
			renderedFeedbacks = sortedFeedbacks.sort(
				(a: any, b: any) => a.upvotes - b.upvotes
			);
			break;

		case "Most Comments":
			renderedFeedbacks = sortedFeedbacks.sort(
				(a: any, b: any) => b.comments.length - a.comments.length
			);
			break;

		case "Least Comments":
			renderedFeedbacks = sortedFeedbacks.sort(
				(a: any, b: any) => a.comments.length - b.comments.length
			);
			break;

		default:
			renderedFeedbacks = sortedFeedbacks.sort(
				(a: any, b: any) => a.upvotes - b.upvotes
			);
			break;
	}

	renderedFeedbacks = sortedFeedbacks.filter(
		(feedback) => feedback.category === sortCategory
	);
	if (sortCategory === "All") renderedFeedbacks = sortedFeedbacks;

	return (
		<section className="feedback">
			{props.upvoteError && (
				<FlashMessage
					status="error"
					text={props.upvoteErrorMessage}
					delay={6000}
					flashType="feedback"
				/>
			)}
			{/* {props.editSuccessful && (
				<FlashMessage
					status="success"
					text="Update Action Successful!"
					delay={6000}
					flashType="feedback"
				/>
			)} */}
			{Array.isArray(renderedFeedbacks) && !renderedFeedbacks.length ? (
				<h1 style={{ fontSize: "2em", color: "#373f68", textAlign: "center" }}>
					<span style={{ display: "block" }}>
						Ooopss... Nothing to see here!
					</span>
					<span>Select another option!</span>
				</h1>
			) : (
				<>
					{renderedFeedbacks?.map((feedback) => (
						<div key={feedback._id}>
							<FeedbackTilesMobile
								sortedFeedback={feedback}
								detailsPage={false}
							/>
							<FeedbackTilesDesktop
								sortedFeedback={feedback}
								detailsPage={false}
							/>
						</div>
					))}
				</>
			)}
		</section>
	);
}

const mapStateToProps = (state: RootState) => {
	return {
		prodFeedbacks: state.productFeedbackReducer.allFeedbacks,
		sortText: state.productFeedbackReducer.sortText,
		sortCategory: state.productFeedbackReducer.sortFeature,
		upvoteError: state.productFeedbackReducer.upvoteError,
		upvoteErrorMessage: state.productFeedbackReducer.upvoteErrorMessage,
		editSuccessful: state.productFeedbackReducer.editSuccessful,
	};
};

export default connect(mapStateToProps)(Feedback);
