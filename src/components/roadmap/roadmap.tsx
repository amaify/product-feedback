import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../button/button";
import LiveComponent from "./components/live";
import PlannedComponent from "./components/planned";
import ProgressComponent from "./components/progress";

import ArrowLeft from "../../assets/images/shared/icon-arrow-left.svg";
import PlusIcon from "../../assets/images/shared/icon-plus.svg";

function Roadmap() {
	const navigate = useNavigate();

	return (
		<section className="roadmap">
			<div className="roadmap-control">
				<div className="roadmap-control__heading" onClick={() => navigate(-1)}>
					<p>
						<span>
							<img src={ArrowLeft} alt="An arrow pointing left" />
						</span>
						<span>go back</span>
					</p>
					<h2>Roadmap</h2>
				</div>
				<Button
					btnText="Add Feedback"
					btnNumber="1"
					icon={<img src={PlusIcon} alt="Addition Sign" />}
					onClick={() => navigate("/new-feedback")}
				/>
			</div>
			<div className="roadmap-contents">
				<PlannedComponent />
				<ProgressComponent />
				<LiveComponent />
			</div>
		</section>
	);
}

export default Roadmap;
