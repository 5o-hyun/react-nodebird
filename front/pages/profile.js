import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import NickNameEditForm from "../components/NickNameEditForm";
import FollowList from "../components/FollowList";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from "../reducers/user";

const profile = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      router.push("/");
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필</title>
      </Head>
      <Layout>
        <NickNameEditForm />
        <FollowList header="팔로잉목록" data={me.Followings} />
        <FollowList header="팔로워목록" data={me.Followers} />
      </Layout>
    </>
  );
};

export default profile;
