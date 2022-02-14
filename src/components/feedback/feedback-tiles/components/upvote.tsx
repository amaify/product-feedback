import React from "react";
import ArrowUp from "../../../../assets/images/shared/icon-arrow-up.svg";

function Upvotes() {
	return (
		<div className="feedback-upvote">
			<div className="feedback-upvote__img">
				<img src={ArrowUp} alt="Arrow facing up" />
			</div>
			<p>108</p>
		</div>
	);
}

export default Upvotes;
