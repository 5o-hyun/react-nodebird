import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import NickNameEditForm from "../components/NickNameEditForm";
import FollowList from "../components/FollowList";

const profile = () => {
  const followerList = [
    { nickname: "소현" },
    { nickname: "소현" },
    { nickname: "소현" },
  ];
  const followingList = [
    { nickname: "소현2" },
    { nickname: "소현2" },
    { nickname: "소현2" },
  ];
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필</title>
      </Head>
      <Layout>
        <NickNameEditForm />
        <FollowList header="팔로잉목록" data={followingList} />
        <FollowList header="팔로워목록" data={followerList} />
      </Layout>
    </>
  );
};

export default profile;
