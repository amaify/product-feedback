import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "../layout/layout";
import NewFeedbackForm from "../forms/new-feedback";
import FeedbackDetails from "../feedback/feedback-details/feedbackDetails";
import Roadmap from "../roadmap/roadmap";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import NotFound from "../../pages/404";
import { RootState } from "../../type";
import ProtectedRoute from "./protectedroute";

function AppRoutes() {
	const isAuth = useSelector(
		(state: RootState) => state.authenticationReducer.isAuth
	);

	const editState = useSelector(
		(state: RootState) => state.productFeedbackReducer.edit
	);

	return (
		<Routes>
			<Route path="*" element={<NotFound />} />

			<Route index element={<Layout />} />
			<Route
				path={editState ? "/edit-feedback/:editFeedbackId" : "/new-feedback"}
				element={
					<ProtectedRoute redirectPath="/login" auth={!isAuth}>
						<NewFeedbackForm />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/feedback-details/:feedbackID"
				element={<FeedbackDetails />}
			/>
			<Route path="/roadmap" element={<Roadmap />} />

			<Route
				path="/login"
				element={
					<ProtectedRoute redirectPath="/" auth={isAuth}>
						<Login />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/register"
				element={
					<ProtectedRoute redirectPath="/" auth={isAuth}>
						<Register />
					</ProtectedRoute>
				}
			/>
			<Route
				path="forgotpassword"
				element={
					<ProtectedRoute redirectPath="/" auth={isAuth}>
						<ForgotPassword />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default AppRoutes;
