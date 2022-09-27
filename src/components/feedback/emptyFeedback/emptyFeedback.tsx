import React from "react";
import Button from "../../button/button";

import EmptyIllustration from "../../../assets/images/suggestions/illustration-empty.svg";
import IconPlus from "../../../assets/images/shared/icon-plus.svg";

function EmptyFeedback() {
	return (
		<div className="emptyFeedback">
			<div className="emptyFeedback-content">
				<div className="emptyFeedback-content__img">
					<img src={EmptyIllustration} alt="Illustration of an Empty content" />
				</div>

				<div className="emptyFeedback-content__texts">
					<h1 className="emptyFeedback-content__texts--heading">
						There is no feedback yet.
					</h1>
					<p className="emptyFeedback-content__texts--description">
						<span>
							Got a suggestion? Found a bug that needs to be squashed?
						</span>{" "}
						<span>We love hearing about new ideas to improve our app.</span>
					</p>
				</div>

				<Button
					btnNumber="1"
					icon={<img src={IconPlus} alt="Addition Sign" />}
					btnText="Add Feedback"
					link="/new-feedback"
				/>
			</div>
		</div>
	);
}

export default EmptyFeedback;
