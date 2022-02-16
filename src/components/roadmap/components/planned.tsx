import React from "react";
import { Link } from "react-router-dom";
import Upvotes from "../../upvotes/upvotes";

import { ArrayOfRoadmaps } from "../../../type";

import CommentsIcon from "../../../assets/images/shared/icon-comments.svg";

const RoadmapItems: ArrayOfRoadmaps[] = [
	{
		id: 0,
		roadmapType: "Planned",
		title: "More comprehensive reports",
		text: "It would be great to see a more detailed breakdown of solutions.",
		feature: "Feature",
		upvotes: 123,
		comments: 2,
	},
	{
		id: 1,
		roadmapType: "Planned",
		title: "Learning paths",
		text: "Sequenced projects for different goals to help people improve.",
		feature: "Feature",
		upvotes: 28,
		comments: 1,
	},
];

function PlannedComponent() {
	return (
		<div className="roadmap-components">
			<div className="roadmap-components__heading">
				<h2 className="roadmap-components__heading--header">
					<span>Planned</span> <span>(2)</span>
				</h2>
				<p className="roadmap-components__heading--description">
					Ideas prioritized for research
				</p>
			</div>

			<div className="roadmap-components__cards" id="planned">
				{RoadmapItems.map((items) => (
					<div className="roadmap-components__card" id="planned" key={items.id}>
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

export default PlannedComponent;
