import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { LOAD_POST_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";

const index = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostLoading) {
          dispatch({
            type: LOAD_POST_REQUEST,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, loadPostLoading]);

  // 리트윗에러
  const { retweetError } = useSelector((state) => state.post);
  useEffect(() => {
    if (retweetError) {
      return alert(retweetError);
    }
  }, [retweetError]);

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
