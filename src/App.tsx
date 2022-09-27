import React from "react";
import AppRoutes from "./components/routes/routes";

import "./assets/scss/main.css";

const App: React.FC = () => {
	return (
		<main className="wrapper">
			<AppRoutes />
		</main>
	);
};

export default App;
