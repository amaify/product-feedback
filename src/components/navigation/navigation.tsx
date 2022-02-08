import React from "react";
import NavigationSort from "./sort/navigation-sort";
import Button from "../button/button";

import IconSuggestion from "../../assets/images/suggestions/icon-suggestions.svg";
import IconPlus from "../../assets/images/shared/icon-plus.svg";

function Navigation() {
	return (
		<nav className="navigation">
			<div className="navigation-suggestion">
				<div className="navigation-suggestion__img">
					<img src={IconSuggestion} alt="Suggestion Description" />
				</div>
				<p className="navigation-suggestion__number">0</p>
				<p className="navigation-suggestion__text">Suggestions</p>
			</div>

			<NavigationSort />

			<Button
				btnNumber="1"
				icon={<img src={IconPlus} alt="Addition Sign" />}
				btnText="Add Feedback"
			/>
		</nav>
	);
}

export default Navigation;
