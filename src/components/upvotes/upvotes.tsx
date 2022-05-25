import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import ArrowUp from "../../assets/images/shared/icon-arrow-up.svg";
import ArrowUpWhite from "../../assets/images/shared/icon-arrow-up-white.svg";
import { RootState, UpvoteProps } from "../../type";
import { upvoteIncrement } from "../../store/utils/feedbackUtil";

function Upvotes(props: UpvoteProps) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuth = useSelector(
		(state: RootState) => state.authenticationReducer.isAuth
	);
	const [active, setActive] = useState<boolean>(false);
	let [upvoteNumber, incrementUpvoteNumber] = useState<number>(
		props.upvoteNumbers === null ? 0 : props.upvoteNumbers
	);

	const setActiveStateHandler = () => {
		setActive(!active);

		if (!isAuth) {
			return navigate("/login");
		}

		incrementUpvoteNumber((upvoteNumber += 1));
		dispatch(upvoteIncrement(props.productId, upvoteNumber));
		console.log(upvoteNumber);
		console.log("clicked upvote");
	};

	return (
		<div
			className={`upvote ${active ? "upvote-active" : ""} ${
				props.divClassName
			}`}
			onClick={setActiveStateHandler}
		>
			<div className={`${props.divClassName}__img`}>
				<img src={!active ? ArrowUp : ArrowUpWhite} alt="Arrow facing up" />
			</div>
			<p>{upvoteNumber}</p>
		</div>
	);
}

//THE STYLING FOR THE ACTIVE STATE AND HOVER STATE IS IN THE BUTTON COMPONENT SCSS FILE

export default Upvotes;
