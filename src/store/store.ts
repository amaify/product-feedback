import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { productFeedbackReducer } from "./reducers/product-feedback";

import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	productFeedbackReducer,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
