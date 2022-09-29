import { useSelector } from "react-redux";
import { RootState } from "../../../type";
import RoadMap from "./SharedRoadMap";

interface MobileNavLink {
	title: string;
	roadMapLength: number;
}

const Utility = () => {
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

	return {
		navLinks: mobileNavLinkOptions ?? [],
		roadMapPlanned,
		roadMapInProgress,
		roadMapLive,
	};
};

export default Utility;
