import {} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../type";
import RoadMap from "./SharedRoadMap";

function LiveComponent() {
	const roadMapState = useSelector(
		(state: RootState) => state.productFeedbackReducer.liveRoadmap
	);
	return (
		<RoadMap
			roadMapTitle="Live"
			roadMapSubTitle="Released Features"
			parentItem={roadMapState}
		/>
	);
}

export default LiveComponent;
