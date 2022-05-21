import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import { RootState, FeedbackProps } from "../../../type";

import ArrowLeft from "../../../assets/images/shared/icon-arrow-left.svg";
import CommentsIcon from "../../../assets/images/shared/icon-comments.svg";

import Button from "../../button/button";
import Upvotes from "../../upvotes/upvotes";

import Comments from "./components/comment";
import AddComment from "./components/add-comment";
import { getOneFeedback } from "../../../store/utils/feedbackUtil";

function FeedbackDetails() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const productId = location.state;

	const feedback = useSelector((state: RootState) => state.oneFeedback);

	useEffect(() => {
		dispatch(getOneFeedback(`${productId}`));
	}, []);

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
						<Upvotes
							divClassName="feedback-upvote"
							upvoteNumbers={feedback.upvotes}
						/>
						<div className="feedback-contents">
							<h2 className="feedback-contents__heading">{feedback.title}</h2>
							<p className="feedback-contents__text">{feedback.description}</p>
							<p className="feedback-contents__feature">{feedback.category}</p>
						</div>
						<div className="feedback-comments">
							<div className="feedback-comments__img">
								<img src={CommentsIcon} alt="Comments description" />
							</div>
							<p>
								{feedback.comments === undefined ? 0 : feedback.comments.length}
							</p>
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
