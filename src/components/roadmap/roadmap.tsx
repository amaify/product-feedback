import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../button/button";
import LiveComponent from "./components/live";
import PlannedComponent from "./components/planned";
import ProgressComponent from "./components/progress";

import ArrowLeft from "../../assets/images/shared/icon-arrow-left.svg";
import PlusIcon from "../../assets/images/shared/icon-plus.svg";
import { getFeedbacks } from "../../store/utils/feedbackUtil";
import { clsx } from "clsx";
import { RootState } from "../../type";

interface MobileNavLink {
	title: string;
	roadMapLength: number;
}

function Roadmap() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const storeState = useSelector((state: RootState) => ({
		plannedRoadMap: state.productFeedbackReducer.plannedRoadmap,
		inProgressRoadMap: state.productFeedbackReducer.inProgressRoadmap,
		liveRoadMap: state.productFeedbackReducer.liveRoadmap,
	}));

	const { plannedRoadMap, inProgressRoadMap, liveRoadMap } = storeState;

	const mobileNavLinkOptions: MobileNavLink[] = [
		{ title: "Planned", roadMapLength: plannedRoadMap?.length },
		{ title: "In-Progress", roadMapLength: inProgressRoadMap?.length },
		{ title: "Live", roadMapLength: liveRoadMap?.length },
	];

	const [selectedTab, setSelectedTab] = useState(mobileNavLinkOptions[0].title);

	useEffect(() => {
		dispatch(getFeedbacks());
	}, [dispatch]);

	const handleSelectTab = (title: string) => {
		setSelectedTab(title);
	};

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
			<div className="roadmap-mobile__nav">
				<ul>
					{mobileNavLinkOptions.map((link) => (
						<li
							key={link.title}
							id={link.title.toLowerCase()}
							onClick={() => handleSelectTab(link.title)}
							className={clsx(link.title === selectedTab && "active")}
						>
							<span>{link.title}</span> <span>({link.roadMapLength})</span>
						</li>
					))}
				</ul>
			</div>
			<div className="roadmap-mobile__contents">
				{selectedTab === "Planned" && <PlannedComponent />}
				{selectedTab === "In-Progress" && <ProgressComponent />}
				{selectedTab === "Live" && <LiveComponent />}
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
