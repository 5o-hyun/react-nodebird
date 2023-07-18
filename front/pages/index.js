// import { ConfigContext } from "antd/es/config-provider";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";

const index = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id; // 마지막 게시글의 아이디
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId: lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, loadPostLoading, mainPosts]);

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      // 실제로 쿠키써서 요청을보낼떄만 쿠키를 넣어놨다가, 쿠키를 안써서 요청을보낼때는 쿠키를빼서 전송
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      // 서버사이드렌더링 할거
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_POSTS_REQUEST,
      });
      store.dispatch(END); // dispatch를 통해 받아올 데이터를 성공될때까지 기다려준다
      await store.sagaTask.toPromise(); // 이건..사용방법
    }
);
// getServerSideProps부분이 실행되면 index Reducer에 case HYDRATE: 부분이 실행된다.

export default index;
