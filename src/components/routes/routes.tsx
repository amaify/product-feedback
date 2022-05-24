import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../layout/layout";
import NewFeedbackForm from "../forms/new-feedback";
import FeedbackDetails from "../feedback/feedback-details/feedbackDetails";
import Roadmap from "../roadmap/roadmap";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";

function AppRoutes() {
	const [state, setState] = useState(false);
	return (
		<Routes>
			<Route path="/" element={<Layout />} />
			<Route
				path={state ? "/edit-feedback" : "/new-feedback"}
				element={<NewFeedbackForm />}
			/>
			<Route
				path="/feedback-details/:feedbackID"
				element={<FeedbackDetails />}
			/>
			<Route path="/roadmap" element={<Roadmap />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="forgotpassword" element={<ForgotPassword />} />
		</Routes>
	);
}

export default AppRoutes;
