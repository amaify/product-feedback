import React from "react";
import { Link } from "react-router-dom";
import { FeedbackProps } from "../../../../type";
import truncateText from "../../../../utils/truncate";
import Upvotes from "../../../upvotes/upvotes";
import CommentsIcon from "../../../../assets/images/shared/icon-comments.svg";

interface Props {
	sortedFeedback: FeedbackProps[];
}

const FeedbackTilesMobile = ({ sortedFeedback }: Props) => {
	return (
		<div className="feedback-tiles__mobile">
			{sortedFeedback.map((feed) => (
				<div className="feedback-wrapper" key={feed._id}>
					<Link
						to={{ pathname: `/feedback-details/${feed._id}` }}
						state={feed}
						className="feedback-contents"
					>
						<h2 className="feedback-contents__heading">{feed.title}</h2>
						<p className="feedback-contents__text">
							{truncateText(feed.description, 150, true)}
						</p>
						<p className="feedback-contents__feature">{feed.category}</p>
					</Link>

					<div className="feedback-wrapper__mobile">
						<Upvotes
							divClassName="feedback-upvote"
							upvoteNumbers={feed.upvotes}
							productId={feed._id}
						/>
						<div className="feedback-comments">
							<div className="feedback-comments__img">
								<img src={CommentsIcon} alt="Comments description" />
							</div>
							<p>{feed.comments.length}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default FeedbackTilesMobile;
