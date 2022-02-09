import React, { useState } from "react";
import { ListOfArray } from "../../../utils/model";

import ArrowDown from "../../../assets/images/shared/icon-arrow-down.svg";
import ArrowUp from "../../../assets/images/shared/icon-arrow-up.svg";

import Dropdown from "./dropdown";

const DropdownList: ListOfArray[] = [
	{ id: 0, text: "Most Upvotes" },
	{ id: 1, text: "Least Upvotes" },
	{ id: 2, text: "Most Comments" },
	{ id: 3, text: "Least Comments" },
];

const NavigationSort: React.FC = () => {
	const [activeClick, setActiveClick] = useState(0);
	const [activeText, setActiveText] = useState("Most Upvotes");
	const [showDropdown, setShowDropdown] = useState(false);

	const setActiveOnClickHandler = (drop: { id: number; text: string }) => {
		setActiveClick(drop.id);
		setActiveText(drop.text);
		setShowDropdown(!showDropdown);
	};

	const onDisplayDropdownHandler = () => {
		setShowDropdown(!showDropdown);
	};

	return (
		<div className="navigation-sort">
			<p className="navigation-sort__text">
				Sort by : <span onClick={onDisplayDropdownHandler}>{activeText}</span>
			</p>
			<div className="navigation-sort__img">
				{!showDropdown ? (
					<img src={ArrowDown} alt="Dropdown Arrow" />
				) : (
					<img src={ArrowUp} alt="Dropdown Arrow" />
				)}
			</div>

			<Dropdown
				dropDown={DropdownList}
				onClickHandler={setActiveOnClickHandler}
				clickState={activeClick}
				displayDropdown={showDropdown}
			/>
		</div>
	);
};

export default NavigationSort;
