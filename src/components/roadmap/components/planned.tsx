import { useSelector } from "react-redux";
import { RootState } from "../../../type";
import RoadMap from "./SharedRoadMap";

function PlannedComponent() {
	const roadMapState = useSelector(
		(state: RootState) => state.productFeedbackReducer.plannedRoadmap
	);
	return (
		<RoadMap
			roadMapTitle="Planned"
			roadMapSubTitle="Ideas prioritized for research"
			parentItem={roadMapState}
		/>
	);
}

export default PlannedComponent;
