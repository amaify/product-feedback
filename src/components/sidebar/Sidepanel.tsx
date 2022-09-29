import React from "react";
import { clsx } from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../type";
import { logoutUser } from "../../store/actions/creators/authentication";

interface Props {
	children: React.ReactNode;
	showSidePanel: boolean;
	handleShowSidePanel: () => void;
}

const SidePanel = ({ children, showSidePanel, handleShowSidePanel }: Props) => {
	const dispatch = useDispatch();
	const authState = useSelector((rootState: RootState) => ({
		isAuth: rootState.authenticationReducer.isAuth,
		userName: rootState.authenticationReducer.name,
	}));

	const { isAuth, userName } = authState;

	return (
		<div className={clsx(`sidepanel ${showSidePanel && "sidepanel-open"}`)}>
			<div className="sidepanel-children">
				<div
					className="sidepanel-children__overlay"
					onClick={handleShowSidePanel}
				></div>

				{isAuth && (
					<p className="sidepanel-children__username">
						{`Hi ` + userName.split(" ")[0] + "!"}
					</p>
				)}
				{children}

				{isAuth && (
					<p
						className="sidepanel-children__btn"
						onClick={() => {
							handleShowSidePanel();
							dispatch(logoutUser());
						}}
					>
						Logout
					</p>
				)}
			</div>
		</div>
	);
};

export default SidePanel;
