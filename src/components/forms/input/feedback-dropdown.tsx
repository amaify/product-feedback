import CheckMark from "../../../assets/images/shared/icon-check.svg";
import { ListOfArray } from "../../../utils/model";
import { FeedbackDropdownProps } from "../../../type";

const selectOptions: ListOfArray[] = [
	{ id: 0, text: "Feature" },
	{ id: 1, text: "UI" },
	{ id: 2, text: "UX" },
	{ id: 3, text: "Enhancement" },
	{ id: 4, text: "Bug" },
];

function FeedbackDropdown(props: FeedbackDropdownProps) {
	return (
		<ul
			className={`feedbackForm-form__select--options ${
				props.displayElement ? "show-options" : ""
			}`}
		>
			{selectOptions.map((option) => (
				<li
					key={option.id}
					className={`feedbackForm-form__select--options__item ${
						option.id === props.activeElement ? "active" : ""
					}`}
					onClick={() => props.onSelectItem(option)}
				>
					<span>{option.text}</span>
					<span>
						{option.id === props.activeElement ? (
							<img src={CheckMark} alt="A Checkmark" />
						) : null}
					</span>
				</li>
			))}
		</ul>
	);
}

export default FeedbackDropdown;
