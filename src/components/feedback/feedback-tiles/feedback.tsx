import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { RootState } from "../../../type";
import { Link } from "react-router-dom";
import CommentsIcon from "../../../assets/images/shared/icon-comments.svg";

// import Upvotes from "./components/upvote";
import Upvotes from "../../upvotes/upvotes";

function Feedback() {
	const prodFeedbacks = useSelector(
		(state: RootState) => state.productFeedbackReducer.allFeedbacks
	);
	const sortText = useSelector(
		(state: RootState) => state.productFeedbackReducer.sortText
	);

	let sortedFeedbacks = [...prodFeedbacks];

	switch (sortText) {
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

	return (
		<section className="feedback">
			{sortedFeedbacks.map((feed) => (
				<div className="feedback-wrapper" key={feed._id}>
					<Upvotes
						divClassName="feedback-upvote"
						upvoteNumbers={feed.upvotes}
						productId={feed._id}
					/>
					<Link
						to={{ pathname: `/feedback-details/${feed._id}` }}
						state={feed}
						className="feedback-contents"
					>
						<h2 className="feedback-contents__heading">{feed.title}</h2>
						<p className="feedback-contents__text">{feed.description}</p>
						<p className="feedback-contents__feature">{feed.category}</p>
					</Link>
					<div className="feedback-comments">
						<div className="feedback-comments__img">
							<img src={CommentsIcon} alt="Comments description" />
						</div>
						<p>{feed.comments.length}</p>
					</div>
				</div>
			))}
		</section>
	);
}

export default Feedback;
