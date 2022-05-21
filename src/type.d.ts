import { compose } from "redux";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

interface ArrayOfRoadmaps {
	id: number;
	roadmapType: string;
	title: string;
	text: string;
	feature: string;
	upvotes: number;
	comments: number;
}

interface UpvoteProps {
	divClassName: string;
	upvoteNumbers: number;
}

interface FeedbackProps {
	_id: string;
	id: number;
	title: string;
	category: string;
	upvotes: number;
	status: string;
	description: string;
	creator: string;
	comments: string[];
}

interface RootState {
	allFeedbacks: FeedbackProps[];
	oneFeedback: FeedbackProps;
}
