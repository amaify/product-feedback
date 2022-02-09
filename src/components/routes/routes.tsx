import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../layout/layout";
import NewFeedbackForm from "../forms/new-feedback";

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Layout />} />
			<Route path="new-feedback" element={<NewFeedbackForm />} />
		</Routes>
	);
}

export default AppRoutes;
