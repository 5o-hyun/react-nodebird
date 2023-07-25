import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import NickNameEditForm from "../components/NickNameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";
import router from "next/router";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import useSWR from "swr"; // npm i swr , load get같은 간단한 데이터가져오기를 한줄로 가능
import axios from "axios";
import { END } from "redux-saga";
import wrapper from "../store/configureStore";

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const profile = () => {
  const { me } = useSelector((state) => state.user);

  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);

  const { data: followingsData, error: followingsError } = useSWR(
    `http://localhost:3065/user/followings?limit=${followingsLimit}`,
    fetcher
  );

  const { data: followersData, error: followersError } = useSWR(
    `http://localhost:3065/user/followers?limit=${followersLimit}`,
    fetcher
  );

  // 0. const {data,error} = useSWR(..) 둘다없을땐 loading, 성공시 data, 실패시 error 반환
  // 1. useSWR(불러올주소,받아올데이터처리)
  // 2. fetcher 함수에 then으로 반환한 result.data가 data로 들어감
  // 3. 팔로워,팔로잉의 {data,error}가 같은이름이라 각각 이름을 붙여줌 (followersData,followingsData...)

  useEffect(() => {
    if (!(me && me.id)) {
      router.push("/");
    }
  }, [me && me.id]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  if (followingsError || followersError) {
    console.error(followingsError || followersError);
    return "팔로잉/팔로워 로딩 중 에러가 발생했습니다.";
  }

  if (!me) {
    return "내 정보 로딩중...";
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필</title>
      </Head>
      <Layout>
        <NickNameEditForm />
        <FollowList
          header="팔로잉목록"
          data={followingsData}
          onClickMore={loadMoreFollowings}
          loading={!followingsData && !followingsError}
        />
        <FollowList
          header="팔로워목록"
          data={followersData}
          onClickMore={loadMoreFollowers}
          loading={!followersData && !followersError}
        />
      </Layout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default profile;
