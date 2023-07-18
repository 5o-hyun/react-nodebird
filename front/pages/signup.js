import React, { useCallback, useState, useEffect } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import { Checkbox, Form, Input, Button } from "antd";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

const signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, loginDone } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (loginDone) {
      router.replace("/"); // push는 뒤로가기하면 페이지나옴. replace는 뒤로가기해도 안나옴
    }
  }, [loginDone]);

  useEffect(() => {
    if (signUpDone) {
      router.replace("/");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [email, setEmail] = useInput("");
  const [nickname, setNickname] = useInput("");
  const [password, setPassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  });

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState("");
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, nickname, password },
    });
  }, [password, passwordCheck, term]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입</title>
      </Head>
      <Layout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-email">아이디</label>
            <br />
            <Input
              name="user-email"
              type="email"
              value={email}
              onChange={setEmail}
              required
            />
          </div>
          <div>
            <label htmlFor="user-nickname">닉네임</label>
            <br />
            <Input
              name="user-nickname"
              value={nickname}
              onChange={setNickname}
              required
            />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input
              name="user-password"
              value={password}
              onChange={setPassword}
              required
            />
          </div>
          <div>
            <label htmlFor="user-passwordCheck">비밀번호체크</label>
            <br />
            <Input
              name="user-passwordCheck"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <ErrorMessage>비밀번호가 일치하지않습니다.</ErrorMessage>
            )}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              동의하기
            </Checkbox>
            {termError && (
              <ErrorMessage style={{ color: "red" }}>
                약관에 동의하셔야합니다.
              </ErrorMessage>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>
              가입하기
            </Button>
          </div>
        </Form>
      </Layout>
    </>
  );
};
const ErrorMessage = styled.div`
  color: red;
`;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      // 실제로 쿠키써서 요청을보낼떄만 쿠키를 넣어놨다가, 쿠키를 안써서 요청을보낼때는 쿠키를빼서 전송
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      // 서버사이드렌더링 할거
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch(END); // dispatch를 통해 받아올 데이터를 성공될때까지 기다려준다
      await store.sagaTask.toPromise(); // 이건..사용방법
    }
);
// getServerSideProps부분이 실행되면 index Reducer에 case HYDRATE: 부분이 실행된다.

export default signup;
