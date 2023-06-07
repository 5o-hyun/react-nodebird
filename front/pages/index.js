import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const index = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <Layout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((mainPost) => (
        <PostCard key={mainPost.id} post={mainPost} />
      ))}
    </Layout>
  );
};

export default index;
