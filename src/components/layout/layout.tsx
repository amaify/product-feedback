import React from "react";

import Sidebar from "../sidebar/sidebar";
import FeedbackContainer from "../feedback/feedbackContainer";
import Navigation from "../navigation/navigation";

function Layout() {
	return (
		<section className="layout">
			<div className="layout-sidebar">
				<Sidebar />
			</div>
			<div className="layout-main">
				<Navigation />
				<FeedbackContainer />
			</div>
		</section>
	);
}

export default Layout;
