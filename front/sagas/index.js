import { all, fork } from "redux-saga/effects";
import postSaga from "./post";
import userSaga from "./user";

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}

/*
all : 배열을 받아 모두 동시에 실행
fork : 비동기 함수 실행 => 결과값을 안기다리고 다음거 바로 실행
call : 동기 함수 실행 => 결과값을 기다려줬다가 실행
take : action이 실행될때까지 기다리고, 실행되면 두번째인자를 실행함
put : 액션을 dispatch

yield는 단 한번만 실행하기떄문에 두번실행할수가없다.(로그인->로그아웃->로그인)
따라서 무한대로 돌려줘야함
while, take : 동기적으로 동작

while(true){} 대체하려면, 비동기로 동작하는것들 써줌 
takeEvery : " // 여러번누르면, 여러번동작
takeLatest : " // 여러번누르면, 마지막만 실행 => 실수로 두번클릭하는것들을 방지하기위해 보통 이걸 씀
takeLeading : " // 여러번누르면, 첫번째만 실행 

하지만 takeLatest 요청은 두번보내도 응답을 한번 안받는거일뿐 요청 자체는 계속간다.
그래서 백엔드에서 검사를 해서 막아야함.
요청자체를 제한할수는 없을까? 있다.
throttle : " // 몇초동안 요청자체를 막음      yield throttle("ADD_POST_REQUEST", addPost, 2000);
하지만 이것도 문제가 있으므로 호출시 조건문에 !isLoading 등을 추가해서 요청자체를 한번만 하게한다.
*/
