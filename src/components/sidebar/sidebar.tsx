import React from "react";
import Feature from "./feature";
import Roadmap from "./roadmap";

import BackgroundHeader from "../../assets/images/suggestions/desktop/background-header.png";

function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebar-header">
				<img src={BackgroundHeader} alt="Background Header" />
				<div className="sidebar-header__text">
					<h1>Frontend Mentor</h1>
					<p>Feedback Board</p>
				</div>
			</div>

			<Feature />
			<Roadmap />
		</div>
	);
}

export default Sidebar;
