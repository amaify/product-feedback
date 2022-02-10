import React from "react";
import Layout from "./components/layout/layout";
import AppRoutes from "./components/routes/routes";
import EmptyIllustration from "./assets/images/suggestions/illustration-empty.svg";

import "./assets/scss/main.css";

const App: React.FC = () => {
	return (
		<main className="wrapper">
			{/* <Layout /> */}
			<AppRoutes />
		</main>
	);
};

export default App;
