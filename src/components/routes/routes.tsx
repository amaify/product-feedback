import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../layout/layout";
import NewFeedbackForm from "../forms/new-feedback";
import FeedbackDetails from "../feedback/feedback-details/feedbackDetails";

function AppRoutes() {
	const [state, setState] = useState(false);
	return (
		<Routes>
			<Route path="/" element={<Layout />} />
			<Route
				path={state ? "edit-feedback" : "new-feedback"}
				element={<NewFeedbackForm />}
			/>
			<Route
				path="/feedback-details/:feedbackID"
				element={<FeedbackDetails />}
			/>
		</Routes>
	);
}

export default AppRoutes;
