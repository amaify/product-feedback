import { createStore, applyMiddleware, compose, combineReducers } from "redux";

// import { productFeedbackReducer } from "./reducers/product-feedback";
import { productFeedbackReducer, commentReducer } from "./reducers/index";

import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	productFeedbackReducer: productFeedbackReducer,
	commentReducer: commentReducer,
});

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
