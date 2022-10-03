import React from "react";
import Button from "../button/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cancelDelete } from "../../store/actions/creators/product-feedback";
import { deleteProductFeedback } from "../../store/utils/feedbackUtil";
import { RootState } from "../../type";
// import { FeedbackProps } from "../../type";

type deleteContent = {
	id: string;
	title: string;
};

function Modal(props: deleteContent) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const reduxState = useSelector((state: RootState) => ({
		userToken: state.authenticationReducer.token,
		feedbackLoading: state.productFeedbackReducer.feedbackLoading,
	}));

	const { userToken, feedbackLoading } = reduxState;

	const cancelDeleteHandler = () => {
		dispatch(cancelDelete());
	};

	const deleteProductFeedbackHandler = () => {
		dispatch(deleteProductFeedback(props.id, userToken, navigate));
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<>
					<h1 className="modal-content__heading">Confirm Deletion</h1>
					<p className="modal-content__text">
						Are you sure you want to delete Product feedback "{props.title}-
						{props.id}"? This action cannot be undone.
					</p>
					<div className="modal-content__btn">
						<Button
							btnNumber="3"
							btnText="Cancel"
							onClick={cancelDeleteHandler}
						/>
						<Button
							btnNumber="4"
							btnText={!feedbackLoading ? "Delete" : "Deleting..."}
							onClick={deleteProductFeedbackHandler}
						/>
					</div>
				</>
			</div>
		</div>
	);
}

export default Modal;
