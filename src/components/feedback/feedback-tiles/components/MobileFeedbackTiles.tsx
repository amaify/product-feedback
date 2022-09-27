import React from "react";
import { Link } from "react-router-dom";
import { FeedbackProps } from "../../../../type";
import truncateText from "../../../../utils/truncate";
import Upvotes from "../../../upvotes/upvotes";
import CommentsIcon from "../../../../assets/images/shared/icon-comments.svg";

interface Props {
	sortedFeedback: FeedbackProps;
	detailsPage: boolean;
}

const FeedbackTilesMobile = ({ sortedFeedback, detailsPage }: Props) => {
	return (
		<div className="feedback-tiles__mobile">
			<div className="feedback-wrapper">
				{!detailsPage ? (
					<Link
						to={{ pathname: `/feedback-details/${sortedFeedback?._id}` }}
						state={sortedFeedback}
						className="feedback-contents"
					>
						<h2 className="feedback-contents__heading">
							{sortedFeedback?.title}
						</h2>
						<p className="feedback-contents__text">
							{truncateText(sortedFeedback?.description, 150, true)}
						</p>
						<p className="feedback-contents__feature">
							{sortedFeedback?.category}
						</p>
					</Link>
				) : (
					<div className="feedback-contents">
						<h2 className="feedback-contents__heading">
							{sortedFeedback?.title}
						</h2>
						<p className="feedback-contents__text">
							{truncateText(sortedFeedback?.description, 150, true)}
						</p>
						<p className="feedback-contents__feature">
							{sortedFeedback?.category}
						</p>
					</div>
				)}

				<div className="feedback-wrapper__mobile">
					<Upvotes
						divClassName="feedback-upvote"
						upvoteNumbers={sortedFeedback.upvotes}
						productId={sortedFeedback._id}
					/>
					<div className="feedback-comments">
						<div className="feedback-comments__img">
							<img src={CommentsIcon} alt="Comments description" />
						</div>
						<p>{sortedFeedback.comments.length}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeedbackTilesMobile;
