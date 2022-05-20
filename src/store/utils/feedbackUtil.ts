import { getProductFeedback } from "../actions/creators/product-feedback";

export const getFeedbacks = () => {
	return (dispatch: any) => {
		fetch("http://localhost:8080/feedback/feedbacks", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((responseData) => {
				dispatch(getProductFeedback(responseData.data));
			})
			.catch((error) => console.log(error));
	};
};
