import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Upvotes from "../../upvotes/upvotes";

import { RootState, FeedbackProps } from "../../../type";

import CommentsIcon from "../../../assets/images/shared/icon-comments.svg";

interface ReduxState {
	liveRoadmap: FeedbackProps[];
}

function LiveComponent({ liveRoadmap }: ReduxState) {
	return (
		<div className="roadmap-components">
			<div className="roadmap-components__heading">
				<h2 className="roadmap-components__heading--header">
					<span>Live</span> <span>({liveRoadmap.length})</span>
				</h2>
				<p className="roadmap-components__heading--description">
					Released Features
				</p>
			</div>

			<div className="roadmap-components__cards" id="planned">
				{liveRoadmap.map((items) => (
					<div className="roadmap-components__card" id="live" key={items._id}>
						<Link
							to={{ pathname: `/feedback-details/${items._id}` }}
							state={items}
						>
							<p className="roadmap-components__card--type">{items.status}</p>
							<h2 className="roadmap-components__card--heading">
								{items.title}
							</h2>
							<p className="roadmap-components__card--text">
								{items.description}
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
}

const mapStateToProps = (state: RootState) => {
	return {
		liveRoadmap: state.productFeedbackReducer.liveRoadmap,
	};
};

export default connect(mapStateToProps)(LiveComponent);
