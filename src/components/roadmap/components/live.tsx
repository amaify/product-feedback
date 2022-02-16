import React from "react";
import { Link } from "react-router-dom";

import Upvotes from "../../upvotes/upvotes";

import { ArrayOfRoadmaps } from "../../../type";

import CommentsIcon from "../../../assets/images/shared/icon-comments.svg";

const RoadmapItems: ArrayOfRoadmaps[] = [
	{
		id: 0,
		roadmapType: "Live",
		title: "Add micro-interactions",
		text: "Small animations at specific points can add delight.",
		feature: "Enhancement",
		upvotes: 71,
		comments: 2,
	},
];

function LiveComponent() {
	return (
		<div className="roadmap-components">
			<div className="roadmap-components__heading">
				<h2 className="roadmap-components__heading--header">
					<span>Live</span> <span>(1)</span>
				</h2>
				<p className="roadmap-components__heading--description">
					Released Features
				</p>
			</div>

			<div className="roadmap-components__cards" id="planned">
				{RoadmapItems.map((items) => (
					<div className="roadmap-components__card" id="live" key={items.id}>
						<Link to={{ pathname: `/feedback-details/${items.id}` }}>
							<p className="roadmap-components__card--type">
								{items.roadmapType}
							</p>
							<h2 className="roadmap-components__card--heading">
								{items.title}
							</h2>
							<p className="roadmap-components__card--text">{items.text}</p>
						</Link>
						<p className="roadmap-components__card--feature">{items.feature}</p>

						<div className="roadmap-components__card--reactions">
							<Upvotes
								divClassName="roadmap-components__card--reactions-upvote"
								upvoteNumbers={items.upvotes}
							/>

							<div className="roadmap-components__card--reactions-comments">
								<img src={CommentsIcon} alt="Comments of people" />
								<p id={items.comments === 0 ? "no-comment" : ""}>
									{items.comments}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default LiveComponent;
