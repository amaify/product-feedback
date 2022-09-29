import React, { useState, useRef } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import ArrowUp from "../../assets/images/shared/icon-arrow-up.svg";
import ArrowUpWhite from "../../assets/images/shared/icon-arrow-up-white.svg";
import { FlashMessage } from "../../utils/flash-message";
import { RootState, FeedbackProps } from "../../type";
// import { upvoteIncrement } from "../../store/utils/feedbackUtil";
import { prettyDOM } from "@testing-library/react";
import feedback from "../feedback/feedback-tiles/feedback";
import {
	resetFeedbackState,
	upvoteError,
} from "../../store/actions/creators/product-feedback";

interface UpvoteProps {
	divClassName: string;
	upvoteNumbers: number;
	isAuth: boolean;
	productId?: any;
	token: string;
}

interface ResponseData {
	statusCode: number;
	data: { upvotes: number };
	message: string;
}

function Upvotes(props: UpvoteProps) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { divClassName, upvoteNumbers, isAuth, productId } = props;

	const [active, setActive] = useState<boolean>(false);
	const [upvoteNumber, setUpvoteNumber] = useState<number | string>(
		upvoteNumbers === null ? 0 : upvoteNumbers
	);

	const setActiveStateHandler = (prodId: string) => {
		// if (!isAuth) {
		// 	return navigate("/login");
		// }

		let data = {
			upvotes: upvoteNumber,
		};

		setUpvoteNumber("...");
		setActive(true);

		fetch(`http://localhost:8080/feedback/upvoting/${prodId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${props.token}`,
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((responseData: ResponseData) => {
				if (responseData.statusCode !== 201) {
					setUpvoteNumber(upvoteNumber);
					setActive(false);
					dispatch(upvoteError(responseData.message));

					setTimeout(() => {
						dispatch(resetFeedbackState());
					}, 6000);

					return;
				}
				setUpvoteNumber(responseData.data.upvotes);
				setActive(false);
			})
			.catch((error) => {
				setUpvoteNumber(upvoteNumber);
				setActive(false);
				dispatch(upvoteError(error.message));
				setTimeout(() => {
					dispatch(resetFeedbackState());
				}, 6000);
			});
	};

	return (
		<div
			className={`upvote ${active ? "upvote-active" : ""} ${divClassName}`}
			onClick={() => setActiveStateHandler(productId)}
		>
			<div className={`${divClassName}__img`}>
				<img src={!active ? ArrowUp : ArrowUpWhite} alt="Arrow facing up" />
			</div>
			<p>{upvoteNumber}</p>
		</div>
	);
}

//THE STYLING FOR THE ACTIVE STATE AND HOVER STATE IS IN THE BUTTON COMPONENT SCSS FILE

const mapStateToProps = (state: RootState) => {
	return {
		isAuth: state.authenticationReducer.isAuth,
		token: state.authenticationReducer.token,
	};
};

export default connect(mapStateToProps)(Upvotes);
