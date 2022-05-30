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
import { setEditToTrue } from "../../../store/actions/creators/product-feedback";

function FeedbackDetails() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const prod: any = location.state;

	useEffect(() => {
		dispatch(getOneFeedback(`${prod._id}`));
	}, []);

	const feedback = useSelector(
		(state: RootState) => state.productFeedbackReducer.oneFeedback
	);
	const comments = useSelector(
		(state: RootState) => state.commentReducer.feedbackComments
	);

	const isAuth = useSelector(
		(state: RootState) => state.authenticationReducer.isAuth
	);

	const userId = useSelector(
		(state: RootState) => state.authenticationReducer.userId
	);

	console.log(prod.upvotes);

	const editButtonHandler = () => {
		dispatch(setEditToTrue(feedback));
		console.log(feedback);
		navigate(`/edit-feedback/${feedback._id}`);
	};

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

						{/* {isAuth && (
							<Button
								btnNumber="2"
								btnText="Edit Feedback"
								onClick={editButtonHandler}
							/>
						)} */}
						{isAuth ? (
							userId === feedback.creator ? (
								<Button
									btnNumber="2"
									btnText="Edit Feedback"
									onClick={editButtonHandler}
								/>
							) : (
								""
							)
						) : (
							""
						)}
					</div>

					<div className="feedbackdetails-contents__feedback--text">
						<Upvotes
							divClassName="feedback-upvote"
							upvoteNumbers={prod.upvotes}
							productId={feedback._id}
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
				{isAuth && <AddComment />}
			</div>
		</section>
	);
}

export default FeedbackDetails;
