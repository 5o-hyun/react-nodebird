import React, { useCallback, useMemo, useEffect } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, loginRequestAction } from "../reducers/user";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginLoading, loginError } = useSelector((state) => state.user);
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]);

  const style = useMemo(() => ({ marginTop: "10px" }, []));

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
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
        <label htmlFor="user-pw">패스워드</label>
        <br />
        <Input
          name="user-pw"
          value={password}
          onChange={setPassword}
          required
        />
      </div>
      <ButtonWrapper style={style}>
        <Button type="primary" htmlType="submit" loading={loginLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

export default LoginForm;
