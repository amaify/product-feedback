import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FeedbackProps, RootState } from "../../type";

interface ReduxState {
	plannedRoadmap: FeedbackProps[];
	inProgressRoadmap: FeedbackProps[];
	liveRoadmap: FeedbackProps[];
}

function Roadmap({
	plannedRoadmap,
	inProgressRoadmap,
	liveRoadmap,
}: ReduxState) {
	return (
		<div className="sidebar-roadmap">
			<div className="sidebar-roadmap__heading">
				<h2>Roadmap</h2>
				<Link to="/roadmap">View</Link>
			</div>

			<ul className="sidebar-roadmap__items">
				<li className="sidebar-roadmap__items--list" id="planned">
					<span>Planned</span>
					<span>{plannedRoadmap.length}</span>
				</li>
				<li className="sidebar-roadmap__items--list" id="in-progress">
					<span>In-Progress</span>
					<span>{inProgressRoadmap.length}</span>
				</li>
				<li className="sidebar-roadmap__items--list" id="live">
					<span>Live</span>
					<span>{liveRoadmap.length}</span>
				</li>
			</ul>
		</div>
	);
}

const mapStateToProps = (state: RootState) => {
	return {
		plannedRoadmap: state.productFeedbackReducer.plannedRoadmap,
		inProgressRoadmap: state.productFeedbackReducer.inProgressRoadmap,
		liveRoadmap: state.productFeedbackReducer.liveRoadmap,
	};
};

export default connect(mapStateToProps)(Roadmap);
