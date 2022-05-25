import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NavigationSort from "./sort/navigation-sort";
import Button from "../button/button";

import IconSuggestion from "../../assets/images/suggestions/icon-suggestions.svg";
import IconPlus from "../../assets/images/shared/icon-plus.svg";
import IconUser from "../../assets/images/shared/icon-user.svg";
import IconLogout from "../../assets/images/shared/icon-logout.svg";

import { RootState } from "../../type";
import { LogoutUser } from "../../store/utils/authentication";

function Navigation() {
	const dispatch = useDispatch();

	const allFeedbacks = useSelector(
		(state: RootState) => state.productFeedbackReducer.allFeedbacks
	);

	const isAuth = useSelector(
		(state: RootState) => state.authenticationReducer.isAuth
	);

	const userName = useSelector(
		(state: RootState) => state.authenticationReducer.name
	);

	const logoutHandler = () => {
		dispatch(LogoutUser());
	};

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

			{isAuth && (
				<p className="navigation-username">{`Hi ` + userName.split(" ")[0]}</p>
			)}

			{!isAuth ? (
				<Link to={"/login"} className="navigation-authentication">
					<img src={IconUser} alt="Authentication Illustration" />
				</Link>
			) : (
				<div className="navigation-authentication" onClick={logoutHandler}>
					<img src={IconLogout} alt="Authentication Illustration" />
				</div>
			)}

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
