import { useSelector } from "react-redux";
import { RootState } from "../../../type";
import RoadMap from "./SharedRoadMap";

function ProgressComponent() {
	const roadMapState = useSelector(
		(state: RootState) => state.productFeedbackReducer.inProgressRoadmap
	);
	return (
		<RoadMap
			roadMapTitle="In-Progress"
			roadMapSubTitle="Currently being developed"
			parentItem={roadMapState}
		/>
	);
}

export default ProgressComponent;
