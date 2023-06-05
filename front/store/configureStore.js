import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers";

const configureStore = (data) => {
  const middlewares = [];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares)) // 배포용 => devtools 연결 x
      : composeWithDevTools(applyMiddleware(...middlewares)); // 개발용 => devtools 연결 o
  const store = createStore(reducer, enhancer);
  store.dispatch({
    type: "LOG_IN",
    data,
  });
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
