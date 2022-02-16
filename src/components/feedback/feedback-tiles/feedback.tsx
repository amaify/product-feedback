import React from "react";
import { Link } from "react-router-dom";
import CommentsIcon from "../../../assets/images/shared/icon-comments.svg";

// import Upvotes from "./components/upvote";
import Upvotes from "../../upvotes/upvotes";

function Feedback() {
	return (
		<section className="feedback">
			<div className="feedback-wrapper">
				<Upvotes divClassName="feedback-upvote" upvoteNumbers={108} />
				<Link
					to={{ pathname: `/feedback-details/${123}` }}
					className="feedback-contents"
				>
					<h2 className="feedback-contents__heading">Add tags for solution</h2>
					<p className="feedback-contents__text">
						Easier to search for solutions based on a specific stack.
					</p>
					<p className="feedback-contents__feature">Enhancement</p>
				</Link>
				<div className="feedback-comments">
					<div className="feedback-comments__img">
						<img src={CommentsIcon} alt="Comments description" />
					</div>
					<p>2</p>
				</div>
			</div>

			<div className="feedback-wrapper">
				<Upvotes divClassName="feedback-upvote" upvoteNumbers={23} />
				<div className="feedback-contents">
					<h2 className="feedback-contents__heading">
						Add a dark theme option
					</h2>
					<p className="feedback-contents__text">
						It would help people with light sensitivities and who prefer dark
						mode.
					</p>
					<p className="feedback-contents__feature">Bug</p>
				</div>
				<div className="feedback-comments">
					<div className="feedback-comments__img">
						<img src={CommentsIcon} alt="Comments description" />
					</div>
					<p>23</p>
				</div>
			</div>

			<div className="feedback-wrapper">
				<Upvotes divClassName="feedback-upvote" upvoteNumbers={48} />
				<div className="feedback-contents">
					<h2 className="feedback-contents__heading">
						Q&A within the challenge hubs
					</h2>
					<p className="feedback-contents__text">
						Challenge-specific Q&A would make for easy reference.
					</p>
					<p className="feedback-contents__feature">Enhancement</p>
				</div>
				<div className="feedback-comments">
					<div className="feedback-comments__img">
						<img src={CommentsIcon} alt="Comments description" />
					</div>
					<p>2</p>
				</div>
			</div>
		</section>
	);
}

export default Feedback;
