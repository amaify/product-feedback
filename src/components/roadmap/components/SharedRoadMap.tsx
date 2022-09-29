import React from "react";
import { Link } from "react-router-dom";
import { FeedbackProps } from "../../../type";
import Upvotes from "../../upvotes/upvotes";
import CommentsIcon from "../../../assets/images/shared/icon-comments.svg";
import truncateText from "../../../utils/truncate";

interface Props {
	roadMapTitle: string;
	roadMapSubTitle: string;
	parentItem: FeedbackProps[];
}

const RoadMap = ({ roadMapTitle, parentItem, roadMapSubTitle }: Props) => {
	return (
		<div className="roadmap-components">
			<div className="roadmap-components__heading">
				<h2 className="roadmap-components__heading--header">
					<span>{roadMapTitle}</span> <span>({parentItem.length})</span>
				</h2>
				<p className="roadmap-components__heading--description">
					{roadMapSubTitle}
				</p>
			</div>

			<div
				className="roadmap-components__cards"
				id={roadMapTitle.toLowerCase()}
			>
				{parentItem.map((items) => (
					<div
						className="roadmap-components__card"
						id={roadMapTitle.toLowerCase()}
						key={items._id}
					>
						<Link
							to={{ pathname: `/feedback-details/${items._id}` }}
							state={items}
						>
							<p className="roadmap-components__card--type">{items.status}</p>
							<h2 className="roadmap-components__card--heading">
								{items.title}
							</h2>
							<p className="roadmap-components__card--text">
								{truncateText(items?.description, 70, true)}
							</p>
						</Link>
						<p className="roadmap-components__card--feature">
							{items.category}
						</p>

						<div className="roadmap-components__card--reactions">
							<Upvotes
								divClassName="roadmap-components__card--reactions-upvote"
								upvoteNumbers={items.upvotes}
								productId={items._id}
							/>

							<div className="roadmap-components__card--reactions-comments">
								<img src={CommentsIcon} alt="Comments of people" />
								<p id={items.comments.length === 0 ? "no-comment" : ""}>
									{items.comments.length}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RoadMap;
