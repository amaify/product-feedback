import React, { useState } from "react";
import FormInput from "../../../forms/input/input";
import Button from "../../../button/button";

function AddComment() {
	const [maxCharacters, setMaxCharacter] = useState<number>(250);
	const [charactersLeft, setCharactersLeft] = useState<number>(250);
	const [inputValue, setInputValue] = useState<string>("");

	const inputChangeHandler = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const char = event.target.value;

		const charCount = char.length;
		const maxChar = maxCharacters;

		const charLength = maxChar - charCount;

		console.log(charLength);

		setCharactersLeft(charLength);

		setInputValue(char);
	};

	const blurHandler = (
		event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		console.log(inputValue);
	};

	return (
		<div className="addcomment">
			<h2 className="addcomment-heading">Add Comment</h2>
			<form>
				<FormInput
					control="textarea"
					name="userComment"
					id="add-comment"
					placeholder="Type your comment here"
					onChange={inputChangeHandler}
					onBlur={blurHandler}
					defaultValue={inputValue}
					maxLength={250}
				/>

				<div className="addcomment-actions">
					<p className="addcomment-actions__wordcount">
						<span>{charactersLeft}</span> <span>Characters left</span>
					</p>

					<Button btnNumber="1" btnText="Post Comment" />
				</div>
			</form>
		</div>
	);
}

export default AddComment;
