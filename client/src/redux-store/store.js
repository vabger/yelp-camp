import { createStore, applyMiddleware, combineReducers } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import { campgroundsReducer } from "./reducers/campgroundsReducers";
import { usersReducer } from "./reducers/usersReducers";
import { uiReducer } from "./reducers/uiReducers";

const rootReducer = combineReducers({
  campgrounds: campgroundsReducer,
  users: usersReducer,
  ui: uiReducer,
});

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
