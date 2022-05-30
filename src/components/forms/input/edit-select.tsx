import React, { useState } from "react";
import FeedbackDropdown from "./feedback-dropdown";
import EditDropdown from "./editFeedback-dropdown";

import ArrowDown from "../../../assets/images/shared/icon-arrow-down.svg";
import ArrowUp from "../../../assets/images/shared/icon-arrow-up.svg";
import { InputSelectProps } from "../../../type";

// interface InputSelectProps {
// 	labelTitle: string;
// 	labelDescription: string;
// 	labelHtmlFor: string;
// 	activeText: string;
// 	activeClick: number | string;
// 	onSelectItemHandler: (item: { id: number; text: string }) => void;
// }

function EditInputSelect(props: InputSelectProps) {
	const [displayOptions, setDisplayOptions] = useState(false);
	const [activeClick, setActiveClick] = useState(0);
	const [activeText, setActiveText] = useState("Suggestion");

	// const onSelectItemHandler = (item: { id: number; text: string }) => {
	// 	setActiveClick(item.id);
	// 	setActiveText(item.text);
	// };

	const onSelectOptionHandler = () => {
		setDisplayOptions(!displayOptions);
	};

	return (
		<>
			<div className="feedbackForm-form__control">
				<label htmlFor={props.labelHtmlFor}>
					<span>{props.labelTitle}</span>
					<span>{props.labelDescription}</span>
				</label>
				<div
					className="feedbackForm-form__select"
					onClick={onSelectOptionHandler}
				>
					<p>
						<span>{props.activeText}</span>
						<span>
							{displayOptions ? (
								<img src={ArrowUp} alt="Arrow pointing down" />
							) : (
								<img src={ArrowDown} alt="Arrow pointing up" />
							)}
						</span>
					</p>

					<EditDropdown
						activeElement={props.activeClick}
						activeTextElement={props.activeText}
						onSelectItem={props.onSelectItemHandler}
						displayElement={displayOptions}
					/>
				</div>
			</div>
		</>
	);
}

export default EditInputSelect;
