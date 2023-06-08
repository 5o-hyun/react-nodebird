import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import reducer from "../reducers";
import rootSaga from "../sagas"; // * 사가 사용해서 추가

const loggerMiddleWare =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log(action);
    return next(action);
  };

const configureStore = (data) => {
  const sagaMiddleWare = createSagaMiddleware(); // * 사가 사용해서 추가
  const middlewares = [sagaMiddleWare, loggerMiddleWare];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares)) // 배포용 => devtools 연결 x
      : composeWithDevTools(applyMiddleware(...middlewares)); // 개발용 => devtools 연결 o
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleWare.run(rootSaga); // * 사가 사용해서 추가
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
