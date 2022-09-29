import { Routes, Route } from "react-router-dom";
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
	const storeState = useSelector((state: RootState) => ({
		isAuth: state.authenticationReducer.isAuth,
		editState: state.productFeedbackReducer.edit,
	}));

	const { isAuth, editState } = storeState;

	return (
		<Routes>
			<Route path="*" element={<NotFound />} />

			<Route index element={<Layout />} />
			<Route
				path={!editState ? "/new-feedback" : "/edit-feedback/:editFeedbackId"}
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
