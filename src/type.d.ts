import { compose } from "redux";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
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
	creatorAvatar: string;
	productFeedback: string;
	creator: string;
}

interface CommentReplies {
	_id: string;
	content: string;
	replyingTo: string;
	creatorName: string;
	creatorUsername: string;
	creatorAvatar: string;
	linkedComment: string;
	creator: string;
}

interface RootState {
	productFeedbackReducer: {
		allFeedbacks: FeedbackProps[];
		plannedRoadmap: FeedbackProps[];
		inProgressRoadmap: FeedbackProps[];
		liveRoadmap: FeedbackProps[];
		oneFeedback: FeedbackProps;
		feedbackLoading: boolean;
		sortText: string;
		sortFeature: string;
		edit: boolean;
		editContent: FeedbackProps;
		getFeedbackToDelete: boolean;
	};

	commentReducer: {
		feedbackComments: FeedbackComment[];
		commentReplies: CommentReplies[];
		addCommentLoading: boolean;
	};

	authenticationReducer: {
		token: string;
		name: string;
		userId: string;
		isAuth: boolean;
		authLoading: boolean;
		error: string;
		isError: boolean;
		registrationSuccess: boolean;
		authMessage: string;
	};
}

interface FeedbackDropdownProps {
	activeElement: number;
	activeTextElement: string;
	displayElement: boolean;
	onSelectItem: (option: { id: number; text: string }) => void;
}

interface InputSelectProps {
	labelTitle: string;
	labelDescription: string;
	labelHtmlFor: string;
	activeText: string;
	activeClick: number;
	onSelectItemHandler: (item: { id: number; text: string }) => void;
}
