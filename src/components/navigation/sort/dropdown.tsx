import React, { useState } from "react";

import CheckMark from "../../../assets/images/shared/icon-check.svg";

interface DropdownPropList {
	clickState: number;
	onClickHandler: (drop: { id: number; text: string }) => void;
	dropDown: { id: number; text: string }[];
	displayDropdown: boolean;
}

function Dropdown(props: DropdownPropList) {
	return (
		<div
			className={`navigation-sort__dropdown ${
				!props.displayDropdown ? "hide-dropdown" : null
			}`}
		>
			<ul className="navigation-sort__dropdown--items">
				{props.dropDown.map((drop) => (
					<li
						key={drop.id}
						className={`navigation-sort__dropdown--item ${
							props.clickState === drop.id
								? "navigation-sort__dropdown--item active"
								: "navigation-sort__dropdown--item"
						}`}
						onClick={() => props.onClickHandler(drop)}
					>
						<span>{drop.text}</span>
						<span>
							{props.clickState === drop.id ? (
								<img src={CheckMark} alt="Check Mark" />
							) : (
								""
							)}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Dropdown;
