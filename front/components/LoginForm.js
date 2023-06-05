import React, { useCallback, useMemo } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { loginAction } from "../reducers/user";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [id, setId] = useInput("");
  const [password, setPassword] = useInput("");

  const style = useMemo(() => ({ marginTop: "10px" }, []));

  const onSubmitForm = useCallback(() => {
    dispatch(loginAction({ id, password }));
  }, [id, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={setId} required />
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
        <Button type="primary" htmlType="submit" loading={false}>
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
