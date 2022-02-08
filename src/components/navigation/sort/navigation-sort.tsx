import React from "react";

import ArrowDown from "../../../assets/images/shared/icon-arrow-down.svg";

const NavigationSort: React.FC = () => {
	return (
		<div className="navigation-sort">
			<p className="navigation-sort__text">
				Sort by : <span>most upvotes</span>
			</p>
			<div className="navigation-sort__img">
				<img src={ArrowDown} alt="Dropdown Arrow" />
			</div>
		</div>
	);
};

export default NavigationSort;
