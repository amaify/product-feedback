import Button from "../components/button/button";
import { Helmet, HelmetProvider } from "react-helmet-async";

const NotFound = () => {
	return (
		<HelmetProvider>
			<div className="notfound">
				<Helmet>
					<title>Page not found! - 404</title>
				</Helmet>
				<div className="notfound-contents">
					<h1>Ooops! Seems you are lost. Click the link below to go back.</h1>
					<Button btnText="Go Home" btnNumber="1" link="/" />
				</div>
			</div>
		</HelmetProvider>
	);
};

export default NotFound;
