import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const index = () => {
  const me = useSelector((state) => state.user.me);
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <Layout>
      {me && <PostForm />}
      {mainPosts.map((mainPost) => (
        <PostCard key={mainPost.id} post={mainPost} />
      ))}
    </Layout>
  );
};

export default index;
