import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Input, Menu, Row, Col } from "antd";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { useRouter } from "next/dist/client/router";

const Layout = ({ children }) => {
  const me = useSelector((state) => state.user.me);
  const [searchInput, onChangeSearchInput] = useInput("");
  const router = useRouter();

  const onSearch = useCallback(() => {
    router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="nodebird">
          <Link href="/">노드버드</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item key="search">
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">회원가입</Link>
        </Menu.Item>
      </Menu>
      <Row gutter={6}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://velog.io/@5o_hyun"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by Sohyun
          </a>
        </Col>
      </Row>
    </div>
  );
};

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
