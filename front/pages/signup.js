import React, { useCallback, useState } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import { Checkbox, Form, Input, Button } from "antd";
import useInput from "../hooks/useInput";
import styled from "styled-components";

const signup = () => {
  const [id, setId] = useInput("");
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
    console.log(id, nickname, term);
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
            <label htmlFor="user-id">아이디</label>
            <br />
            <Input name="user-id" value={id} onChange={setId} required />
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
            <Button type="primary" htmlType="submit">
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

export default signup;
