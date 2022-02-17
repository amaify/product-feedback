import React, { useState } from "react";
import ArrowUp from "../../assets/images/shared/icon-arrow-up.svg";
import ArrowUpWhite from "../../assets/images/shared/icon-arrow-up-white.svg";
import { UpvoteProps } from "../../type";

function Upvotes(props: UpvoteProps) {
	const [active, setActive] = useState(false);

	const setActiveStateHandler = () => {
		setActive(!active);
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
			<p>{props.upvoteNumbers}</p>
		</div>
	);
}

//THE STYLING FOR THE ACTIVE STATE AND HOVER STATE IS IN THE BUTTON COMPONENT SCSS FILE

export default Upvotes;
