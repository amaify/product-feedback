import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";

import NavigationSort from "./sort/navigation-sort";
import Button from "../button/button";

import IconSuggestion from "../../assets/images/suggestions/icon-suggestions.svg";
import IconPlus from "../../assets/images/shared/icon-plus.svg";
import IconUser from "../../assets/images/shared/icon-user.svg";
import IconLogout from "../../assets/images/shared/icon-logout.svg";

import { FeedbackProps, RootState } from "../../type";
import { LogoutUser } from "../../store/utils/authentication";

interface ReduxState {
	allFeedbacks: FeedbackProps[];
	isAuth: boolean;
	userName: string;
}

function Navigation({ allFeedbacks, isAuth, userName }: ReduxState) {
	const dispatch = useDispatch();

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

const mapStateToProps = (state: RootState) => {
	return {
		allFeedbacks: state.productFeedbackReducer.allFeedbacks,
		isAuth: state.authenticationReducer.isAuth,
		userName: state.authenticationReducer.name,
	};
};

export default connect(mapStateToProps)(Navigation);
