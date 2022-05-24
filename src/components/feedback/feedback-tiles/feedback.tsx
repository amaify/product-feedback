import React from "react";
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

	return (
		<section className="feedback">
			{prodFeedbacks.map((feed) => (
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
