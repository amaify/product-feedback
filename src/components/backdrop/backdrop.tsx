import React from "react";
import { useDispatch } from "react-redux";
import { cancelDelete } from "../../store/actions/creators/product-feedback";

function Backdrop() {
	const dispatch = useDispatch();

	const cancelDeleteHandler = () => {
		dispatch(cancelDelete());
	};

	return <div className="backdrop" onClick={cancelDeleteHandler}></div>;
}

export default Backdrop;
