import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Upvotes from "../../upvotes/upvotes";

import { FeedbackProps, RootState } from "../../../type";

import CommentsIcon from "../../../assets/images/shared/icon-comments.svg";

interface ReduxState {
	plannedRoadmap: FeedbackProps[];
}

function PlannedComponent({ plannedRoadmap }: ReduxState) {
	return (
		<div className="roadmap-components">
			<div className="roadmap-components__heading">
				<h2 className="roadmap-components__heading--header">
					<span>Planned</span> <span>({plannedRoadmap.length})</span>
				</h2>
				<p className="roadmap-components__heading--description">
					Ideas prioritized for research
				</p>
			</div>

			<div className="roadmap-components__cards" id="planned">
				{plannedRoadmap.map((items) => (
					<div
						className="roadmap-components__card"
						id="planned"
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
		plannedRoadmap: state.productFeedbackReducer.plannedRoadmap,
	};
};

export default connect(mapStateToProps)(PlannedComponent);
