import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import NickNameEditForm from "../components/NickNameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";

const profile = () => {
  const { me } = useSelector((state) => state.user);

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
