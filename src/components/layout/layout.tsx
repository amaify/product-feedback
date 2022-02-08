import React from "react";

import Sidebar from "../sidebar/sidebar";
import Feedback from "../feedback/feedback";
import Navigation from "../navigation/navigation";

function Layout() {
	return (
		<section className="layout">
			<div className="layout-sidebar">
				<Sidebar />
			</div>
			<div className="layout-main">
				<Navigation />
				<Feedback />
			</div>
		</section>
	);
}

export default Layout;
