import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { RootState } from "../../../type";
import ArrowLeft from "../../../assets/images/shared/icon-arrow-left.svg";
import Button from "../../button/button";
import Comments from "./components/comment";
import AddComment from "./components/add-comment";
import { getOneFeedback } from "../../../store/utils/feedbackUtil";
import { setEditToTrue } from "../../../store/actions/creators/product-feedback";
import { getComments, getReplies } from "../../../store/utils/commentUtil";
import { Loader } from "../../loading/loading";
import FeedbackTilesDesktop from "../feedback-tiles/components/DesktopFeedbackTiles";
import FeedbackTilesMobile from "../feedback-tiles/components/MobileFeedbackTiles";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { FeedbackUtility } from "../util";
import { FlashMessage } from "../../../utils/flash-message";

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
			commentErrMessage: state.commentReducer.commentErrMessage,
		};
	});

	const { error, errMessage } = FeedbackUtility();
	const { feedback, feedbackLoading, isAuth, userId, commentErrMessage } =
		allData;

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
		<HelmetProvider>
			<section className="feedbackdetails">
				<Helmet>
					<title>
						{feedback?.title
							? `${feedback?.title} - Product Feedback`
							: "Product Feedback Details"}
					</title>
				</Helmet>
				{commentErrMessage !== "" && (
					<FlashMessage
						status="error"
						text={commentErrMessage}
						delay={10000}
						flashType="feedback"
					/>
				)}
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

				{error && (
					<>
						<div className="feedbackdetails-contents__controls">
							<p onClick={() => navigate(-1)}>
								<span>
									<img src={ArrowLeft} alt="Arrow facing Left" />
								</span>
								<span>go back</span>
							</p>
						</div>
						{errMessage}
					</>
				)}
			</section>
		</HelmetProvider>
	);
}

export default FeedbackDetails;
