import React, { useEffect } from "react";
import Layout from "./components/layout/layout";
import AppRoutes from "./components/routes/routes";
import EmptyIllustration from "./assets/images/suggestions/illustration-empty.svg";

import "./assets/scss/main.css";
import { useDispatch } from "react-redux";
import { getFeedbacks } from "./store/utils/feedbackUtil";

const App: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFeedbacks());
	}, []);

	return (
		<main className="wrapper">
			{/* <Layout /> */}
			<AppRoutes />
		</main>
	);
};

export default App;
