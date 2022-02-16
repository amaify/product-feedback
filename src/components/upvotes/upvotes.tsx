import React from "react";
import ArrowUp from "../../assets/images/shared/icon-arrow-up.svg";
import { UpvoteProps } from "../../type";

function Upvotes(props: UpvoteProps) {
	return (
		<div className={props.divClassName}>
			<div className={`${props.divClassName}__img`}>
				<img src={ArrowUp} alt="Arrow facing up" />
			</div>
			<p>{props.upvoteNumbers}</p>
		</div>
	);
}

export default Upvotes;
