import React, { useState, useEffect } from "react";
import useInput from "../../../../hooks/use-input";
import { useSelector, connect, useDispatch } from "react-redux";

import ElijahImg from "../../../../assets/images/user-images/image-elijah.jpg";
import JamesImg from "../../../../assets/images/user-images/image-james.jpg";
import AnneImg from "../../../../assets/images/user-images/image-anne.jpg";
import RyanImg from "../../../../assets/images/user-images/image-ryan.jpg";
import ReplyComment from "./reply-comment";
import { CommentReplies, FeedbackComment, RootState } from "../../../../type";
import {
	replyToComment,
	replyToReply,
} from "../../../../store/utils/commentUtil";

interface Props {
	userToken: string;
	isAuth: boolean;
	comments: FeedbackComment[];
	commentReplies: CommentReplies[];
}

function Comments({ userToken, isAuth, comments, commentReplies }: Props) {
	const dispatch = useDispatch();

	const [reply, setReply] = useState<string>("");
	const [commentCount, setCommentCount] = useState<number | string>(0);
	const [replies, setReplies] = useState(0);

	useEffect(() => {
		comments !== undefined
			? setCommentCount(comments.length)
			: setCommentCount(0);
	}, []);

	const {
		value,
		inputBlurHandler,
		inputChangeHandler,
		resetUserInput,
		hasError,
		isValueValid,
	} = useInput((value) => value.trim() !== "" && value.length >= 5);

	let isValid = false;

	if (isValueValid) isValid = true;

	const replyToggleHandler = (id: string) => {
		setReply(id);
	};

	const submitFormHandler = (event: React.FormEvent) => {
		event.preventDefault();

		if (!isValid) {
			inputBlurHandler();
			return;
		}

		const replyInput: { content: string } = { content: value };
		console.log(value);
		dispatch(replyToComment(reply, userToken, replyInput));

		resetUserInput();
		setReply("");
	};

	const submitReplyToReplyHandler = (event: React.FormEvent) => {
		event.preventDefault();

		if (!isValid) {
			inputBlurHandler();
			return;
		}

		const replyInput: { content: string } = { content: value };
		console.log(value);
		dispatch(replyToReply(reply, userToken, replyInput));

		resetUserInput();
		setReply("");
	};

	return (
		<div className="comments">
			{comments !== undefined ? (
				<h2 className="comments-heading">
					<span>{comments.length}</span> <span>Comments</span>
				</h2>
			) : (
				<h2 className="comments-heading">
					<span>No Comments</span>
				</h2>
			)}

			<div className="comments-wrapper">
				{comments !== undefined
					? comments.map((comment) => (
							<div
								className={`${
									commentReplies.length > 0 || comments.length > 0
										? "comments-comment comments-comment__line comments-comment__more"
										: "comments-comment"
								}`}
								key={comment._id}
							>
								<div className="comments-comment__parent">
									<div className="comments-comment__img">
										<img src={ElijahImg} alt="A person named Elijah" />
									</div>

									<div className="comments-comment__contents">
										<p className="comments-comment__contents--name">
											{comment.creatorName}
										</p>
										<p className="comments-comment__contents--username">
											<span>@</span>
											<span>{comment.creatorUsername}</span>
										</p>
										<p
											className={`${
												commentCount > 0
													? "comments-comment__contents--comment comments-comment__contents--comment-more"
													: "comments-comment__contents--comment"
											}`}
										>
											{comment.content}
										</p>

										{isAuth && (
											<p
												className="comments-comment__contents--replyBtn"
												onClick={() => replyToggleHandler(comment._id)}
											>
												Reply
											</p>
										)}

										{reply === comment._id && (
											<ReplyComment
												commentNumber={commentCount}
												submitFormHandler={submitFormHandler}
												onChangeHandler={inputChangeHandler}
												onBlur={inputBlurHandler}
												hasError={hasError}
												isValueValid={isValueValid}
												value={value}
											/>
										)}
									</div>
								</div>

								{commentReplies.map((reps) => {
									if (comment._id === reps.linkedComment) {
										return (
											<div className="comments-comment__replies" key={reps._id}>
												<div
													className={
														commentReplies.length > 0
															? "comments-comment__img comments-comment__img--line"
															: "comments-comment__img"
													}
												>
													<img src={AnneImg} alt="A person named Elijah" />
												</div>

												<div className="comments-comment__contents">
													<p className="comments-comment__contents--name">
														{reps.creatorName}{" "}
													</p>
													<p className="comments-comment__contents--username">
														<span>@</span>
														<span>{reps.creatorUsername}</span>
													</p>
													<p className="comments-comment__contents--comment">
														<span>@</span>
														<span>{reps.replyingTo}</span> {reps.content}
													</p>

													{isAuth && (
														<p
															className="comments-comment__contents--replyBtn"
															onClick={() => replyToggleHandler(reps._id)}
														>
															Reply
														</p>
													)}

													{reply === reps._id ? (
														<ReplyComment
															commentNumber={commentCount}
															submitFormHandler={submitReplyToReplyHandler}
															onChangeHandler={inputChangeHandler}
															onBlur={inputBlurHandler}
															hasError={hasError}
															isValueValid={isValueValid}
															value={value}
														/>
													) : (
														""
													)}
												</div>
											</div>
										);
									}
								})}
							</div>
					  ))
					: ""}
			</div>
		</div>
	);
}

const mapStateToProps = (state: RootState) => {
	return {
		userToken: state.authenticationReducer.token,
		isAuth: state.authenticationReducer.isAuth,
		comments: state.commentReducer.feedbackComments,
		commentReplies: state.commentReducer.commentReplies,
	};
};

export default connect(mapStateToProps)(Comments);
