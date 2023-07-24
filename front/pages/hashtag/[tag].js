// hashtag/[tag].js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { END } from "redux-saga";

import axios from "axios";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../../reducers/post";
import PostCard from "../../components/PostCard";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import Layout from "../../components/Layout";

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePost, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostsLoading) {
          dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            lastId:
              mainPosts[mainPosts.length - 1] &&
              mainPosts[mainPosts.length - 1].id,
            data: tag,
          });
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length, hasMorePost, tag, loadPostsLoading]);

  return (
    <Layout>
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: params.tag,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Hashtag;
