import React from "react";
import { useSelector } from "react-redux";
import Head from "next/head";

import { Avatar, Card } from "antd";
import wrapper from "../store/configureStore";
import { LOAD_USER_REQUEST } from "../reducers/user";
import { END } from "redux-saga";
import Layout from "../components/Layout";

const about = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <Layout>
      <Head>
        <title>ZeroCho | NodeBird</title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              게시하기
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="nodebird"
          />
        </Card>
      ) : null}
    </Layout>
  );
};

/* 
    getStaticProps: 왠만하면 변하지않는거 (정적인 정보)
    getServerSideProps : 새로고침시 데이터가 변하는거. (동적인 정보) 왠만한건 서버사이드렌더링을 쓰게되더라
*/
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch({
    type: LOAD_USER_REQUEST,
    data: 1,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default about;
