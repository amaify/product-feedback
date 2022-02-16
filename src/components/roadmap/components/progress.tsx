import React from "react";
import { Link } from "react-router-dom";

import Upvotes from "../../upvotes/upvotes";

import { ArrayOfRoadmaps } from "../../../type";

import CommentsIcon from "../../../assets/images/shared/icon-comments.svg";

const RoadmapItems: ArrayOfRoadmaps[] = [
	{
		id: 0,
		roadmapType: "In Progress",
		title: "One-click portfolio generation",
		text: "Add ability to create professional looking portfolio from profile.",
		feature: "Feature",
		upvotes: 62,
		comments: 1,
	},
	{
		id: 1,
		roadmapType: "In Progress",
		title: "Bookmark challenges",
		text: "Be able to bookmark challenges to take later on.",
		feature: "Feature",
		upvotes: 31,
		comments: 1,
	},
	{
		id: 2,
		roadmapType: "In Progress",
		title: "Animated solution screenshots",
		text: `Screenshots of solutions with animations don't display correctly.`,
		feature: "Feature",
		upvotes: 9,
		comments: 0,
	},
];

function ProgressComponent() {
	return (
		<div className="roadmap-components">
			<div className="roadmap-components__heading">
				<h2 className="roadmap-components__heading--header">
					<span>In-Progress</span> <span>(3)</span>
				</h2>
				<p className="roadmap-components__heading--description">
					Currently being developed
				</p>
			</div>

			<div className="roadmap-components__cards" id="planned">
				{RoadmapItems.map((items) => (
					<div
						className="roadmap-components__card"
						id="progress"
						key={items.id}
					>
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

export default ProgressComponent;
