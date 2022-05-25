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
	productId?: any;
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

interface FeedbackComment {
	_id: string;
	id: number;
	content: string;
	replies: string[];
	creatorName: string;
	creatorUsername: number;
	productFeedback: string;
	creator: string;
}

interface CommentReplies {
	_id: string;
	content: string;
	replyingTo: string;
	creatorName: string;
	creatorUsername: string;
	linkedComment: string;
	creator: string;
}

interface RootState {
	productFeedbackReducer: {
		allFeedbacks: FeedbackProps[];
		oneFeedback: FeedbackProps;
		feedbackLoading: boolean;
		sortText: any;
	};

	commentReducer: {
		feedbackComments: FeedbackComment[];
		commentReplies: CommentReplies[];
	};

	authenticationReducer: {
		token: string;
		name: string;
		isAuth: boolean;
	};
}
