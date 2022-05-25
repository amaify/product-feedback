import React from "react";
import Button from "../components/button/button";

const NotFound = () => {
	return (
		<div
			style={{
				width: "50%",
				margin: "0 auto",
				textAlign: "center",
				background: "#ffffff",
				padding: "3em",
			}}
		>
			<h1 style={{ marginBottom: "2em" }}>
				Ooops! Seems you are lost. Click the link below to go back.
			</h1>
			<Button btnText="Go Home" btnNumber="1" link="/" />
		</div>
	);
};

export default NotFound;
