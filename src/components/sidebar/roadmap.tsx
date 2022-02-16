import React from "react";
import { Link } from "react-router-dom";

function Roadmap() {
	return (
		<div className="sidebar-roadmap">
			<div className="sidebar-roadmap__heading">
				<h2>Roadmap</h2>
				<Link to="/roadmap">View</Link>
			</div>

			<ul className="sidebar-roadmap__items">
				<li className="sidebar-roadmap__items--list" id="planned">
					<span>Planned</span>
					<span>0</span>
				</li>
				<li className="sidebar-roadmap__items--list" id="in-progress">
					<span>In-Progress</span>
					<span>0</span>
				</li>
				<li className="sidebar-roadmap__items--list" id="live">
					<span>Live</span>
					<span>0</span>
				</li>
			</ul>
		</div>
	);
}

export default Roadmap;
