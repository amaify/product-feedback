import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../button/button";
import ArrowLeft from "../../assets/images/shared/icon-arrow-left.svg";
import PlusIcon from "../../assets/images/shared/icon-plus.svg";
import { getFeedbacks } from "../../store/utils/feedbackUtil";
import { clsx } from "clsx";
import { RootState } from "../../type";
import RoadMap from "./components/SharedRoadMap";

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
		{ title: "Planned", roadMapLength: plannedRoadMap?.length ?? 0 },
		{ title: "In-Progress", roadMapLength: inProgressRoadMap?.length ?? 0 },
		{ title: "Live", roadMapLength: liveRoadMap?.length ?? 0 },
	];

	const [selectedTab, setSelectedTab] = useState(mobileNavLinkOptions[0].title);

	useEffect(() => {
		dispatch(getFeedbacks());
	}, [dispatch]);

	const roadMapPlanned = (
		<RoadMap
			roadMapTitle="Planned"
			roadMapSubTitle="Ideas prioritized for research"
			parentItem={plannedRoadMap}
		/>
	);

	const roadMapInProgress = (
		<RoadMap
			roadMapTitle="In-Progress"
			roadMapSubTitle="Currently being developed"
			parentItem={inProgressRoadMap}
		/>
	);

	const roadMapLive = (
		<RoadMap
			roadMapTitle="Live"
			roadMapSubTitle="Released Features"
			parentItem={liveRoadMap}
		/>
	);

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
							onClick={() => setSelectedTab(link.title)}
							className={clsx(link.title === selectedTab && "active")}
						>
							<span>{link.title}</span> <span>({link.roadMapLength})</span>
						</li>
					))}
				</ul>
			</div>
			<div className="roadmap-mobile__contents">
				{selectedTab === "Planned" && roadMapPlanned}
				{selectedTab === "In-Progress" && roadMapInProgress}
				{selectedTab === "Live" && roadMapLive}
			</div>
			<div className="roadmap-contents">
				{roadMapPlanned}
				{roadMapInProgress}
				{roadMapLive}
			</div>
		</section>
	);
}

export default Roadmap;
