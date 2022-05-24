import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavigationSort from "./sort/navigation-sort";
import Button from "../button/button";

import IconSuggestion from "../../assets/images/suggestions/icon-suggestions.svg";
import IconPlus from "../../assets/images/shared/icon-plus.svg";
import IconUser from "../../assets/images/shared/icon-user.svg";
import IconLogout from "../../assets/images/shared/icon-logout.svg";

import { RootState } from "../../type";

function Navigation() {
	const allFeedbacks = useSelector(
		(state: RootState) => state.productFeedbackReducer.allFeedbacks
	);
	return (
		<nav className="navigation">
			<div className="navigation-suggestion">
				<div className="navigation-suggestion__img">
					<img src={IconSuggestion} alt="Suggestion Description" />
				</div>
				<p className="navigation-suggestion__number">{allFeedbacks.length}</p>
				<p className="navigation-suggestion__text">Suggestions</p>
			</div>

			<NavigationSort />

			<Link to={"/login"} className="navigation-authentication">
				<img src={IconUser} alt="User Illustration" />
			</Link>

			<Button
				btnNumber="1"
				icon={<img src={IconPlus} alt="Addition Sign" />}
				btnText="Add Feedback"
				link="/new-feedback"
			/>
		</nav>
	);
}

export default Navigation;
