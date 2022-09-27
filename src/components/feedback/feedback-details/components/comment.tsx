import React, { useState, useEffect } from "react";
import useInput from "../../../../hooks/use-input";
import { useParams } from "react-router";
import { connect, useDispatch } from "react-redux";

import NoImage from "../../../../assets/images/no-logo.jpg";
import ReplyComment from "./reply-comment";
import {
	CommentReplies,
	FeedbackComment,
	FeedbackProps,
	RootState,
} from "../../../../type";
import {
	replyToComment,
	replyToReply,
} from "../../../../store/utils/commentUtil";

interface Props {
	userToken: string;
	isAuth: boolean;
	addCommentLoading: boolean;
	comments: FeedbackComment[];
	commentReplies: CommentReplies[];
	feedbackDetails: FeedbackProps;
}

function Comments({
	userToken,
	isAuth,
	comments,
	commentReplies,
	feedbackDetails,
	addCommentLoading,
}: Props) {
	const dispatch = useDispatch();
	const commentId = useParams();

	let prodId = commentId.feedbackID;

	const [reply, setReply] = useState<string>("");
	const [showReply, setShowReply] = useState(false);

	useEffect(() => {
		if (!addCommentLoading) {
			setReply("");
			setShowReply(false);
		}
		localStorage.setItem("editFeedback", "false");
	}, [addCommentLoading]);

	const {
		value,
		inputBlurHandler,
		inputChangeHandler,
		resetUserInput,
		hasError,
		isValueValid,
	} = useInput((value) => value?.trim() !== "" && value?.length >= 5);

	let isValid = false;

	if (isValueValid) isValid = true;

	const replyToggleHandler = (id: string) => {
		setShowReply(!showReply);
		setReply(id);
		if (showReply === false) resetUserInput();
	};

	const submitFormHandler = (event: React.FormEvent) => {
		event.preventDefault();

		if (!isValid) {
			inputBlurHandler();
			return;
		}

		const replyInput: { content: string } = { content: value };
		console.log(value);
		dispatch(replyToComment(reply, userToken, replyInput, prodId));
	};

	const submitReplyToReplyHandler = (event: React.FormEvent) => {
		event.preventDefault();

		if (!isValid) {
			inputBlurHandler();
			return;
		}

		const replyInput: { content: string } = { content: value };
		dispatch(replyToReply(reply, userToken, replyInput, prodId));
	};

	return (
		<div className="comments">
			{comments !== undefined ? (
				<h2 className="comments-heading">
					<span>{comments?.length}</span>{" "}
					<span>{comments?.length > 1 ? "Comments" : "Comment"}</span>
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
									<div className="comments-comment__parent--heading">
										<div className="comments-comment__img">
											<img
												src={
													!comment.creatorAvatar
														? NoImage
														: comment.creatorAvatar
												}
												alt="A photograph of a person"
											/>
										</div>
										<div className="comments-comment__parent--userdetails">
											<p className="comments-comment__contents--name">
												{comment.creatorName}
											</p>
											<p className="comments-comment__contents--username">
												<span>@</span>
												<span>{comment.creatorUsername}</span>
											</p>
										</div>

										{isAuth && (
											<p
												className="comments-comment__contents--replyBtn"
												onClick={() => replyToggleHandler(comment._id)}
											>
												Reply
											</p>
										)}
									</div>
									<div className="comments-comment__contents">
										<p
											className={`${
												feedbackDetails?.comments?.length > 0
													? "comments-comment__contents--comment comments-comment__contents--comment-more"
													: "comments-comment__contents--comment"
											}`}
										>
											{comment.content}
										</p>

										{reply === comment._id && (
											<>
												{showReply && (
													<ReplyComment
														commentNumber={feedbackDetails?.comments?.length}
														submitFormHandler={submitFormHandler}
														onChangeHandler={inputChangeHandler}
														onBlur={inputBlurHandler}
														hasError={hasError}
														isValueValid={isValueValid}
														value={value}
													/>
												)}
											</>
										)}
									</div>
								</div>
								{commentReplies === undefined
									? null
									: commentReplies.map(
											(reps) =>
												comment._id === reps.linkedComment && (
													<div
														className="comments-comment__replies"
														key={reps._id}
													>
														<div className="comments-comment__replies--heading">
															<div
																className={
																	commentReplies.length > 0
																		? "comments-comment__img comments-comment__img--line"
																		: "comments-comment__img"
																}
															>
																<img
																	src={
																		!reps.creatorAvatar
																			? NoImage
																			: reps.creatorAvatar
																	}
																	alt="Photograph of a human being"
																/>
															</div>

															<div className="comments-comment__replies--userdetails">
																<p className="comments-comment__contents--name">
																	{reps.creatorName}{" "}
																</p>
																<p className="comments-comment__contents--username">
																	<span>@</span>
																	<span>{reps.creatorUsername}</span>
																</p>
															</div>

															{isAuth && (
																<p
																	className="comments-comment__contents--replyBtn"
																	onClick={() => replyToggleHandler(reps._id)}
																>
																	Reply
																</p>
															)}
														</div>

														<div className="comments-comment__contents">
															{/* <p className="comments-comment__contents--name">
																{reps.creatorName}{" "}
															</p>
															<p className="comments-comment__contents--username">
																<span>@</span>
																<span>{reps.creatorUsername}</span>
															</p> */}
															<p className="comments-comment__contents--comment">
																<span>@</span>
																<span>{reps.replyingTo}</span> {reps.content}
															</p>

															{/* {isAuth && (
																<p
																	className="comments-comment__contents--replyBtn"
																	onClick={() => replyToggleHandler(reps._id)}
																>
																	Reply
																</p>
															)} */}

															{reply === reps._id ? (
																<>
																	{showReply && (
																		<ReplyComment
																			commentNumber={
																				feedbackDetails?.comments?.length
																			}
																			submitFormHandler={
																				submitReplyToReplyHandler
																			}
																			onChangeHandler={inputChangeHandler}
																			onBlur={inputBlurHandler}
																			hasError={hasError}
																			isValueValid={isValueValid}
																			value={value}
																		/>
																	)}
																</>
															) : (
																""
															)}
														</div>
													</div>
												)
									  )}
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
		addCommentLoading: state.commentReducer.addCommentLoading,
	};
};

export default connect(mapStateToProps)(Comments);
