import { useState } from "react";
import EditDropdown from "./editFeedback-dropdown";

import ArrowDown from "../../../assets/images/shared/icon-arrow-down.svg";
import ArrowUp from "../../../assets/images/shared/icon-arrow-up.svg";
import { InputSelectProps } from "../../../type";

function EditInputSelect(props: InputSelectProps) {
	const [displayOptions, setDisplayOptions] = useState(false);

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
