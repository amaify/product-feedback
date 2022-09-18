import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation, useParams } from "react-router-dom";

import { RootState, FeedbackProps, FeedbackComment } from "../../../type";

import ArrowLeft from "../../../assets/images/shared/icon-arrow-left.svg";
import CommentsIcon from "../../../assets/images/shared/icon-comments.svg";

import Button from "../../button/button";
import Upvotes from "../../upvotes/upvotes";

import Comments from "./components/comment";
import AddComment from "./components/add-comment";
import { getOneFeedback } from "../../../store/utils/feedbackUtil";
import { setEditToTrue } from "../../../store/actions/creators/product-feedback";
import { getComments, getReplies } from "../../../store/utils/commentUtil";

interface StateProps {
	feedback: FeedbackProps;
	isAuth: boolean;
	userId: string;
	comments: any;
}

function FeedbackDetails({ feedback, isAuth, userId, comments }: StateProps) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const params = useParams();

	const { feedbackID } = params;
	const prod: any = location.state;

	useEffect(() => {
		dispatch(getOneFeedback(`${feedbackID}`));
		if (prod.comments.length >= 0) {
			dispatch(getComments(`${feedbackID}`));
		}
		dispatch(getReplies(feedbackID));
	}, []);

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
							<p>{comments === undefined ? 0 : comments.length}</p>
						</div>
					</div>
				</div>

				<Comments />
				{isAuth && <AddComment />}
			</div>
		</section>
	);
}

const mapStateToProps = (state: RootState) => {
	return {
		feedback: state.productFeedbackReducer.oneFeedback,
		isAuth: state.authenticationReducer.isAuth,
		userId: state.authenticationReducer.userId,
		comments: state.commentReducer.feedbackComments,
	};
};

export default connect(mapStateToProps)(FeedbackDetails);
