import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentsIcon from "../../../assets/images/shared/icon-comments.svg";

// import Upvotes from "./components/upvote";
import Upvotes from "../../upvotes/upvotes";

interface FeedbackProps {
	_id: string;
	id: number;
	title: string;
	category: string;
	upvotes: number;
	status: string;
	description: string;
	creator: string;
	comments: string[];
}

interface RootState {
	allFeedbacks: FeedbackProps[];
}

function Feedback() {
	const prodFeedbacks = useSelector((state: RootState) => state.allFeedbacks);

	return (
		<section className="feedback">
			{prodFeedbacks.map((feed) => (
				<div className="feedback-wrapper" key={feed._id}>
					<Upvotes
						divClassName="feedback-upvote"
						upvoteNumbers={feed.upvotes}
					/>
					<Link
						to={{ pathname: `/feedback-details/${feed._id}` }}
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
