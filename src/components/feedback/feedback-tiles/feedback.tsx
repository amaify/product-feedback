import React, { useEffect, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import truncateText from "../../../utils/truncate";
import { FeedbackProps, RootState } from "../../../type";
import { FlashMessage } from "../../../utils/flash-message";
import { Link } from "react-router-dom";
import CommentsIcon from "../../../assets/images/shared/icon-comments.svg";
import FeedbackTilesDesktop from "./components/DesktopFeedbackTiles";
import FeedbackTilesMobile from "./components/MobileFeedbackTiles";

import Upvotes from "../../upvotes/upvotes";
import {
	getFeedbacks,
	// upvoteIncrement,
} from "../../../store/utils/feedbackUtil";

interface StateProps {
	prodFeedbacks: FeedbackProps[];
	sortText: string;
	sortFeature: string;
	upvoteError: boolean;
	upvoteErrorMessage: string;
}

function Feedback(props: StateProps) {
	let sortedFeedbacks = [...props.prodFeedbacks];
	const dispatch = useDispatch();

	switch (props.sortText) {
		case "Most Upvotes":
			sortedFeedbacks = sortedFeedbacks.sort(
				(a: any, b: any) => b.upvotes - a.upvotes
			);
			break;

		case "Least Upvotes":
			sortedFeedbacks = sortedFeedbacks.sort(
				(a: any, b: any) => a.upvotes - b.upvotes
			);
			break;

		case "Most Comments":
			sortedFeedbacks = sortedFeedbacks.sort(
				(a: any, b: any) => b.comments.length - a.comments.length
			);
			break;

		case "Least Comments":
			sortedFeedbacks = sortedFeedbacks.sort(
				(a: any, b: any) => a.comments.length - b.comments.length
			);
			break;

		default:
			sortedFeedbacks = sortedFeedbacks.sort(
				(a: any, b: any) => a.upvotes - b.upvotes
			);
			break;
	}

	switch (props.sortFeature) {
		// case "All":
		// 	sortedFeedbacks = sortedFeedbacks;
		// 	break;

		case "UI":
			sortedFeedbacks = sortedFeedbacks.filter(
				(sorted) => sorted.category === "UI"
			);
			break;

		case "UX":
			sortedFeedbacks = sortedFeedbacks.filter(
				(sorted) => sorted.category === "UX"
			);
			break;

		case "Bug":
			sortedFeedbacks = sortedFeedbacks.filter(
				(sorted) => sorted.category === "Bug"
			);
			break;

		case "Enhancement":
			sortedFeedbacks = sortedFeedbacks.filter(
				(sorted) => sorted.category === "Enhancement"
			);
			break;

		case "Feature":
			sortedFeedbacks = sortedFeedbacks.filter(
				(sorted) => sorted.category === "Feature"
			);
			break;

		default:
			sortedFeedbacks = sortedFeedbacks;
			break;
	}

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
			{Array.isArray(sortedFeedbacks) && !sortedFeedbacks.length ? (
				<h1 style={{ fontSize: "2em", color: "#373f68", textAlign: "center" }}>
					<span style={{ display: "block" }}>
						Ooopss... Nothing to see here!
					</span>
					<span>Select another option!</span>
				</h1>
			) : (
				<>
					<FeedbackTilesMobile sortedFeedback={sortedFeedbacks} />
					<FeedbackTilesDesktop sortedFeedback={sortedFeedbacks} />
				</>
			)}
		</section>
	);
}

const mapStateToProps = (state: RootState) => {
	return {
		prodFeedbacks: state.productFeedbackReducer.allFeedbacks,
		sortText: state.productFeedbackReducer.sortText,
		sortFeature: state.productFeedbackReducer.sortFeature,
		upvoteError: state.productFeedbackReducer.upvoteError,
		upvoteErrorMessage: state.productFeedbackReducer.upvoteErrorMessage,
	};
};

export default connect(mapStateToProps)(Feedback);
