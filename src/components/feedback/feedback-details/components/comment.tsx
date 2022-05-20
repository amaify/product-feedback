import React, { useState } from "react";
import useInput from "../../../../hooks/use-input";

import ElijahImg from "../../../../assets/images/user-images/image-elijah.jpg";
import JamesImg from "../../../../assets/images/user-images/image-james.jpg";
import AnneImg from "../../../../assets/images/user-images/image-anne.jpg";
import RyanImg from "../../../../assets/images/user-images/image-ryan.jpg";
import ReplyComment from "./reply-comment";

function Comments() {
	const [reply, setReply] = useState<number | string>();
	const [commentCount, setCommentCount] = useState(2);
	const [replies, setReplies] = useState(1);

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

	const replyToggleHandler = () => {
		console.log("hello there");
		setReply(1);
	};

	const submitFormHandler = (event: React.FormEvent) => {
		event.preventDefault();

		if (!isValid) {
			inputBlurHandler();
			return;
		}

		console.log(value);

		resetUserInput();

		// setReply(0);
	};

	return (
		<div className="comments">
			<h2 className="comments-heading">
				<span>4</span> <span>Comments</span>
			</h2>

			<div className="comments-wrapper">
				<div
					className={`${
						replies > 0
							? "comments-comment comments-comment__line"
							: commentCount > 1
							? "comments-comment comments-comment__more"
							: "comments-comment"
					}`}
				>
					<div className="comments-comment__parent">
						<div className="comments-comment__img">
							<img src={ElijahImg} alt="A person named Elijah" />
						</div>

						<div className="comments-comment__contents">
							<p className="comments-comment__contents--name">Elijah Moss</p>
							<p className="comments-comment__contents--username">
								@hexagon.bestagon
							</p>
							<p
								className={`${
									commentCount > 1
										? "comments-comment__contents--comment comments-comment__contents--comment-more"
										: "comments-comment__contents--comment"
								}`}
							>
								Also, please allow styles to be applied based on system
								preferences. I would love to be able to browse Frontend Mentor
								in the evening after my device's dark mode turns on without the
								bright background it currently has.
							</p>
							<p
								className="comments-comment__contents--replyBtn"
								onClick={replyToggleHandler}
							>
								Reply
							</p>
							{reply === 1 ? (
								<ReplyComment
									commentNumber={commentCount}
									submitFormHandler={submitFormHandler}
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
				</div>

				<div
					className={`${
						replies > 0
							? "comments-comment comments-comment__line"
							: commentCount > 1
							? "comments-comment comments-comment__more"
							: "comments-comment"
					}`}
				>
					<div className="comments-comment__parent">
						<div className="comments-comment__img">
							<img src={JamesImg} alt="A person named Elijah" />
						</div>

						<div className="comments-comment__contents">
							<p className="comments-comment__contents--name">James Skinner</p>
							<p className="comments-comment__contents--username">
								@hummingbird1
							</p>
							<p className="comments-comment__contents--comment">
								Second this! I do a lot of late night coding and reading. Adding
								a dark theme can be great for preventing eye strain and the
								headaches that result. It's also quite a trend with modern apps
								and apparently saves battery life.
							</p>
							<p
								className="comments-comment__contents--replyBtn"
								onClick={replyToggleHandler}
							>
								Reply
							</p>
							{reply === 2 ? <ReplyComment commentNumber={commentCount} /> : ""}
						</div>
					</div>

					<div className="comments-comment__replies">
						<div
							className={
								replies > 0
									? "comments-comment__img comments-comment__img--line"
									: "comments-comment__img"
							}
						>
							<img src={AnneImg} alt="A person named Elijah" />
						</div>

						<div className="comments-comment__contents">
							<p className="comments-comment__contents--name">
								Anne Valentine{" "}
							</p>
							<p className="comments-comment__contents--username">@annev1990</p>
							<p className="comments-comment__contents--comment">
								<span>@hummingbird1</span> While waiting for dark mode, there
								are browser extensions that will also do the job. Search for
								"dark theme” followed by your browser. There might be a need to
								turn off the extension for sites with naturally black
								backgrounds though.
							</p>
							<p
								className="comments-comment__contents--replyBtn"
								onClick={replyToggleHandler}
							>
								Reply
							</p>
							{reply === 3 ? <ReplyComment commentNumber={commentCount} /> : ""}
						</div>
					</div>

					<div className="comments-comment__replies">
						<div
							className={
								replies > 0
									? "comments-comment__img comments-comment__img--line"
									: "comments-comment__img"
							}
						>
							<img src={RyanImg} alt="A person named Elijah" />
						</div>

						<div className="comments-comment__contents">
							<p className="comments-comment__contents--name">Ryan Welles </p>
							<p className="comments-comment__contents--username">
								@voyager.344
							</p>
							<p className="comments-comment__contents--comment">
								<span>@annev1990</span> Good point! Using any kind of style
								extension is great and can be highly customizable, like the
								ability to change contrast and brightness. I'd prefer not to use
								one of such extensions, however, for security and privacy
								reasons.
							</p>
							<p
								className="comments-comment__contents--replyBtn"
								onClick={replyToggleHandler}
							>
								Reply
							</p>
							{reply === 4 ? <ReplyComment commentNumber={commentCount} /> : ""}
						</div>
					</div>

					{/* <div className="comments-comment__replies">
						<div className="comments-comment__img">
							<img src={RyanImg} alt="A person named Elijah" />
						</div>

						<div className="comments-comment__contents">
							<p className="comments-comment__contents--name">Ryan Welles </p>
							<p className="comments-comment__contents--username">
								@voyager.344
							</p>
							<p className="comments-comment__contents--comment">
								<span>@annev1990</span> Good point! Using any kind of style
								extension is great and can be highly customizable, like the
								ability to change contrast and brightness. I'd prefer not to use
								one of such extensions, however, for security and privacy
								reasons.
							</p>
							<p
								className="comments-comment__contents--replyBtn"
								onClick={replyToggleHandler}
							>
								Reply
							</p>
							{reply === 4 ? (
								<ReplyComment
									postReply={postReplyHandler}
									commentNumber={commentCount}
								/>
							) : (
								""
							)}
						</div>
					</div> */}

					{/* <div className="comments-comment__replies">
						<div className="comments-comment__img">
							<img src={RyanImg} alt="A person named Elijah" />
						</div>

						<div className="comments-comment__contents">
							<p className="comments-comment__contents--name">Ryan Welles </p>
							<p className="comments-comment__contents--username">
								@voyager.344
							</p>
							<p className="comments-comment__contents--comment">
								<span>@annev1990</span> Good point! Using any kind of style
								extension is great and can be highly customizable, like the
								ability to change contrast and brightness. I'd prefer not to use
								one of such extensions, however, for security and privacy
								reasons.
							</p>
							<p
								className="comments-comment__contents--replyBtn"
								onClick={replyToggleHandler}
							>
								Reply
							</p>
							{reply === 4 ? (
								<ReplyComment
									postReply={postReplyHandler}
									commentNumber={commentCount}
								/>
							) : (
								""
							)}
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default Comments;
