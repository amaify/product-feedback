import React from "react";
import { useNavigate } from "react-router";

import ArrowLeft from "../../../assets/images/shared/icon-arrow-left.svg";
import CommentsIcon from "../../../assets/images/shared/icon-comments.svg";

import Button from "../../button/button";
import Upvotes from "../../upvotes/upvotes";

import Comments from "./components/comment";
import AddComment from "./components/add-comment";

function FeedbackDetails() {
	const navigate = useNavigate();
	return (
		<section className="feedbackdetails">
			<div className="feedbackdetails-contents">
				<div className="feedbackdetails-contents__feedback">
					<div className="feedbackdetails-contents__controls">
						<p onClick={() => navigate(-1)}>
							<span>
								<img src={ArrowLeft} alt="Arrow facing Left" />
							</span>
							<span>go back</span>
						</p>

						<Button
							btnNumber="2"
							btnText="Edit Feedback"
							link="/new-feedback"
						/>
					</div>

					<div className="feedbackdetails-contents__feedback--text">
						<Upvotes divClassName="feedback-upvote" upvoteNumbers={108} />
						<div className="feedback-contents">
							<h2 className="feedback-contents__heading">
								Add tags for solution
							</h2>
							<p className="feedback-contents__text">
								Easier to search for solutions based on a specific stack.
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
				</div>

				<Comments />
				<AddComment />
			</div>
		</section>
	);
}

export default FeedbackDetails;
