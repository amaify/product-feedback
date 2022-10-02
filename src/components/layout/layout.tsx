import Sidebar from "../sidebar/sidebar";
import FeedbackContainer from "../feedback/feedbackContainer";
import Navigation from "../navigation/navigation";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Layout() {
	return (
		<HelmetProvider>
			<section className="layout">
				<Helmet>
					<title>Product Feedback - Home</title>
				</Helmet>
				<div className="layout-sidebar">
					<Sidebar />
				</div>
				<div className="layout-main">
					<Navigation />
					<FeedbackContainer />
				</div>
			</section>
		</HelmetProvider>
	);
}

export default Layout;
