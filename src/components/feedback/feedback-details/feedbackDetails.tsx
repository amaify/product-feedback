import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import { RootState } from "../../../type";

import ArrowLeft from "../../../assets/images/shared/icon-arrow-left.svg";
import CommentsIcon from "../../../assets/images/shared/icon-comments.svg";

import Button from "../../button/button";
import Upvotes from "../../upvotes/upvotes";

import Comments from "./components/comment";
import AddComment from "./components/add-comment";
import { getOneFeedback } from "../../../store/utils/feedbackUtil";
import { setEditToTrue } from "../../../store/actions/creators/product-feedback";
import { getComments, getReplies } from "../../../store/utils/commentUtil";
import { Loader } from "../../loading/loading";
import FeedbackTilesDesktop from "../feedback-tiles/components/DesktopFeedbackTiles";
import FeedbackTilesMobile from "../feedback-tiles/components/MobileFeedbackTiles";

function FeedbackDetails() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();

	const { feedbackID } = params;

	const allData = useSelector((state: RootState) => {
		return {
			feedback: state.productFeedbackReducer.oneFeedback,
			feedbackLoading: state.productFeedbackReducer.feedbackLoading,
			isAuth: state.authenticationReducer.isAuth,
			userId: state.authenticationReducer.userId,
			comments: state.commentReducer.feedbackComments,
		};
	});

	const { feedback, feedbackLoading, isAuth, userId, comments } = allData;

	useEffect(() => {
		dispatch(getOneFeedback(feedbackID ?? ""));
		dispatch(getComments(`${feedbackID}`));
		dispatch(getReplies(feedbackID));
	}, [dispatch, feedbackID]);

	const editButtonHandler = () => {
		dispatch(setEditToTrue(feedback));
		navigate(`/edit-feedback/${feedback._id}`);
	};

	return (
		<section className="feedbackdetails">
			{feedbackLoading && <Loader />}
			{!feedbackLoading && feedback && (
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
								userId === feedback?.creator ? (
									<Button
										btnNumber="2"
										btnText="Edit Feedback"
										onClick={editButtonHandler}
									/>
								) : null
							) : null}
						</div>

						<>
							<FeedbackTilesMobile
								sortedFeedback={feedback}
								detailsPage={true}
							/>
							<FeedbackTilesDesktop
								sortedFeedback={feedback}
								detailsPage={true}
							/>
						</>
					</div>

					<Comments feedbackDetails={feedback} />
					{isAuth && <AddComment />}
				</div>
			)}
		</section>
	);
}

export default FeedbackDetails;
