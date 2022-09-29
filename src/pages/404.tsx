import Button from "../components/button/button";

const NotFound = () => {
	return (
		<div className="notfound">
			<div className="notfound-contents">
				<h1>Ooops! Seems you are lost. Click the link below to go back.</h1>
				<Button btnText="Go Home" btnNumber="1" link="/" />
			</div>
		</div>
	);
};

export default NotFound;
